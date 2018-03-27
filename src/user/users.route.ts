import * as express from 'express';
import { User } from './user.model';
import { IUser } from './user.interface';
import { userController } from './user.controller';
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.json(await userController.getAll());
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await userController.getById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = await userController.save(new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      job: req.body.job,
      email: req.body.email,
    }));

    if (user) {
      res.json(user);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:id/cancel', async (req, res, next) => {
  try {
    const user = await userController.deleteById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
});

export { router as userRouter };
