import * as express from 'express';
import { User } from './user.model';
import { IUser } from './user.interface';
import { userController } from './user.controller';
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.json(await userController.getAll());
    next();
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    res.json(await userController.getById(req.params.id));
    next();
  } catch (err) {
    next(err);
  }
});

export { router as userRouter };
