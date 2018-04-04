import * as express from 'express';
import { User } from './user.model';
import { IUser } from './user.interface';
import { userController } from './user.controller';
const router = express.Router();

/**
 * GET /user
 * Returns all undeleted users.
 */
router.get('/', async (req, res, next) => {
  try {
    return res.json(await userController.getAll());
  } catch (err) {
    next(err);
  }
});

/**
 * GET /user/3
 * Returns a specific user by id.
 */
router.get('/:id', async (req, res, next) => {
  try {
    const user = await userController.getById(req.params.id);
    return user ? res.json(user) : res.sendStatus(400);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /user/3/rides
 * Returns all rides of a user.
 */
router.get('/:id/rides', async (req, res, next) => {
  try {
    const rides = await userController.getRides(req.params.id);
    return rides ? res.json(rides) : res.sendStatus(400);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /user/3/rides/active
 * Returns all active rides of a user.
 */
router.get('/:id/rides/active', async (req, res, next) => {
  try {
    const activeRides = await userController.getActiveRides(req.params.id);
    return activeRides ? res.json(activeRides) : res.sendStatus(400);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /user
 * Creates a new user in the database.
 */
router.post('/', async (req, res, next) => {
  try {
    const user = await userController.create(new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      job: req.body.job,
      email: req.body.email,
    }));

    return user ? res.json(user) : res.sendStatus(400);
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /user/3
 * Marks a user as deleted.
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const user = await userController.deleteById(req.params.id);
    return user ? res.json(user) : res.sendStatus(400);
  } catch (err) {
    next(err);
  }
});

export { router as userRouter };
