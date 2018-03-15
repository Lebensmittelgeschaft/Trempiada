import * as express from 'express';
import { User } from './user.model';
import { IUser } from './user.interface';
import { userRepository } from './user.repository';
const router = express.Router();

/* GET all users. */
router.get('/', async (req, res) => {
  /*try {
    const users = await userController.getAll();
    res.json(users);
  } catch (err) {
    res.sendStatus(500);
  }*/
});

/* GET a user. */
router.get('/:id', async (req, res) => {
  /*if (!req.params.id) {
    res.sendStatus(400);
  } else {
    try {
      const user = await userController.getById(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      res.sendStatus(500);
    }
  }*/
});

/* POST a user. */
router.post('/', async (req, res) => {

  // Checks if there's any invalid field.
  /*if (!req.body.id ||
    !req.body.address ||
    !req.body.hasCar) {
    res.sendStatus(400);
  } else {
    const userToSave = new User({
      _id: req.body.id,
      address: req.body.address,
      hasCar: req.body.hasCar,
    });

    try {
      const user = await userController.save(userToSave);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  }*/
});

/* DELETE a user. */
router.delete('/:id', async (req, res) => {
  /*if (!req.params.id) {
    res.sendStatus(400);
  } else {
    try {
      const user = await userController.deleteById(req.params.id);
      if (user) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      res.sendStatus(500);
    }
  }*/
});

/* UPDATE a user's data. */
router.put('/:id', async (req, res) => {

  // Checks if there's any invalid field.
  /*if (!req.params.id ||
    !req.body.address ||
    !req.body.hasCar) {
    res.sendStatus(400);
  } else {
    const userToUpdate: Partial<IUser> = {
      address: req.body.address,
      hasCar: req.body.hasCar,
    };

    try {
      const user = await userController.updateById(req.params.id, userToUpdate);
      if (user) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      res.sendStatus(500);
    }
  }*/
});

export { router };
