import * as express from 'express';
import { User } from './user.model';
import { IUser } from './user.interface';
import { userController } from './user.controller';
import { IRide } from '../ride/ride.interface';
import { ICollection } from '../common/collection.interface';
import { DocumentQuery, Query } from 'mongoose';
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
router.get('/:id/ride', async (req, res, next) => {
  try {
    const pageNumber = +req.query.p;
    const pageSize = +req.query.ps;
    const [activeRides, count] =
      await Promise.all<any>(userController.getRides(req.params.id, pageNumber, pageSize, '-isDeleted -__v'));
    const ridesCollection: ICollection<IRide> = {
      set: <IRide[]>activeRides,
      totalCount: <number>count
    };
    
    return ridesCollection.set ? res.json(ridesCollection) : res.sendStatus(400);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /user/3/rides/active
 * Returns all active rides of a user.
 */
router.get('/:id/ride/active', async (req, res, next) => {
  try {
    const pageNumber = +req.query.p;
    const pageSize = +req.query.ps;
    const [activeRides, count] =
      await Promise.all<any>(userController.getActiveRides(req.params.id, pageNumber, pageSize, '-isDeleted -__v'));
    const ridesCollection: ICollection<IRide> = {
      set: <IRide[]>activeRides,
      totalCount: <number>count
    };

    return ridesCollection.set ? res.json(ridesCollection) : res.sendStatus(400);
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
