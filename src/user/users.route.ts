import * as express from 'express';
import { user as User } from './user.model';
import { IUser } from './user.interface';
import { userController } from './user.manager';
const router = express.Router();

/* GET all users. */
router.get('/', async (req, res) => {
  const users = await userController.getAll();
  if (users) {
    res.json(users);
  } else {
    res.sendStatus(500);
  }
});

/* GET a user. */
router.get('/:id', async (req, res) => {
  if (!req.params.id || typeof req.params.id !== 'string') {
    res.sendStatus(400);
  } else {
    const user = await userController.getById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  }
});

/* POST a user. */
router.post('/', async (req, res) => {

  if (!req.body.id ||
    !req.body.address ||
    !req.body.hasCar ||
    (typeof req.body.id !== 'string' ||
      typeof req.body.address !== 'string' ||
      typeof req.body.hasCar !== 'boolean')) {
    res.sendStatus(400);
  } else {
    const userToSave = new User({
      _id: req.body.id,
      address: req.body.address,
      hasCar: req.body.hasCar,
    });

    const user = await userController.save(userToSave);
    if (user) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  }
});

/* DELETE a user. */
router.delete('/:id', async (req, res) => {
  if (!req.params.id || typeof req.params.id !== 'string') {
    res.sendStatus(400);
  } else {
    const user = await userController.deleteById(req.params.id);
    if (user) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  }
});

/* UPDATE a user's data. */
router.put('/:id', async (req, res) => {
  if (!req.params.id ||
    !req.body.address ||
    !req.body.hasCar ||
    typeof req.params.id !== 'string' ||
    typeof req.body.address !== 'string' ||
    typeof req.body.hasCar !== 'boolean') {
    res.sendStatus(400);
  } else {
    const userToUpdate: Partial<IUser> = {
      address: req.body.address,
      hasCar: req.body.hasCar,
    };

    const user = await userController.updateById(req.params.id, userToUpdate);
    if (user) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  }
});

export { router };
