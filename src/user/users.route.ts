import * as express from 'express';
import { user as User } from './user.model';
import { IUser } from './user.interface';
import { userController } from './user.manager';
const router = express.Router();

/* GET all users. */
router.get('/', async (req, res, next) => {
  try {
    res.json(await userController.getAll());
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

/* GET a user. */
router.get('/:id', async (req, res, next) => {
  try {
    res.json(await userController.getById(req.query.id));
  } catch (err) {
    console.log(`Error finding user. ${err}`);
    res.status(500).send();
  }
});

/* POST a user. */
router.post('/', async (req, res, next) => {
  try {
    const user = new User({
      _id: req.body.id,
      location: req.body.location,
      hasCar: req.body.hasCar,
    });

    await user.save();
    console.log(`User ${user._id} saved.`);
    res.status(200).send();
  } catch (err) {
    console.log(`Error saving user to DB. ${err}`);
    res.status(500).send();
  }
});

/* DELETE a user. */
router.delete('/', async (req, res, next) => {
  try {
    await userController.deleteById(req.body.id);
    console.log(`Deleted user ${req.body.id}.`);
    res.status(200).send();
  } catch (err) {
    console.log(`Error deleting user ${req.body.id}. ${err}`);
    res.status(500).send();
  }
});

/* UPDATE a user's data. */
router.put('/', async (req, res, next) => {
  try {
    const user: Partial<IUser> = {
      location: req.body.location,
      hasCar: req.body.hasCar,
    };

    await userController.updateById(req.body.id, user);
    console.log(`Updated user ${req.body.id}.`);
    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

export { router };
