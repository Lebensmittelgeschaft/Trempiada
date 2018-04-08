import * as express from 'express';
import { Ride, rideSchema } from './ride.model';
import { IRide } from './ride.interface';
import { rideController } from './ride.controller';
import { IUser } from '../user/user.interface';
import { ICollection } from '../common/collection.interface';
const router = express.Router();

/**
 * /GET /ride
 * Returns all undeleted rides.
 */
router.get('/', async (req, res, next) => {
  try {
    const pageNumber = +req.query.p;
    const pageSize = +req.query.ps;
    const search: string = req.query.q;
    const dateFilter: Date = new Date(req.query.d);
    const [rides, count] = await Promise.all<IRide[] | number>(rideController.getAll(pageNumber, pageSize, search, dateFilter, '-isDeleted -__v'));
    const ridesCollection: ICollection<IRide> = {
      set: <IRide[]>rides,
      totalCount: <number>count
    };

    return res.json(ridesCollection);
  } catch (err) {
    next(err);
  }
});

/**
 * /GET /ride/5ab755...
 * Returns a specific ride by id.
 */
router.get('/:id', async (req, res, next) => {
  try {
    const ride = await rideController.getById(req.params.id, '-isDeleted -__v');
    return ride ? res.json(ride) : res.sendStatus(400);
  } catch (err) {
    next(err);
  }
});

/**
 * /POST /ride
 * Creates a new ride in the database.
 */
// TODO: Check that the user who made the request is also the ride driver.
router.post('/', async (req, res, next) => {
  try {
    const ride = await rideController.create(new Ride({
      driver: req.body.driver,
      maxRiders: parseInt(req.body.maxRiders),
      from: req.body.from,
      to: req.body.to,
      departureDate: new Date(req.body.departureDate),
    }));

    return ride ? res.json(ride) : res.sendStatus(400);
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /ride/5ab755...
 * Updates a ride's details by id.
 */
// TODO: Check that the user who made the request is the ride's driver.
router.put('/:id', async (req, res, next) => {
  try {
    const ride = await rideController.getById(req.params.id);
    const rideUpdate = <IRide>{
      from: req.body.from,
      to: req.body.to,
      departureDate: new Date(req.body.departureDate),
      maxRiders: +req.body.maxRiders
    };
    
    if (ride && ride.riders.length <= rideUpdate.maxRiders) {
      const updatedRide = await rideController.updateById(req.params.id, rideUpdate);
      return updatedRide ? res.json(updatedRide) : res.sendStatus(400);
    }

    return res.sendStatus(400);
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /ride/5ab755.../join
 * Adds a user as a rider to a ride.
 */
router.put('/:id/join', async (req, res, next) => {
  try {
    const ride = await rideController.addRider(req.params.id, req.body.user);
    return ride ? res.json(ride) : res.sendStatus(400);
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /ride/5ab755.../leave
 * Removes a user from the riders collection of a ride.
 */
router.put('/:id/leave', async (req, res, next) => {
  try {
    const ride = await rideController.removeRider(req.params.id, req.body.user);
    return ride ? res.json(ride) : res.sendStatus(400);
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /ride/5ab755.../cancel
 * Cancels a ride and sends a notification to all its riders.
 */
// TODO: Check that the user who made the request is the ride's driver.
router.put('/:id/cancel', async (req, res, next) => {
  try {
    const ride = await rideController.cancelRide(req.params.id);
    return ride ? res.json(ride) : res.sendStatus(400);
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /ride/5ab755...
 * Marks a ride as deleted.
 */
// TODO: Check that the user who made the request is the ride's driver.
router.delete('/:id', async (req, res, next) => {
  try {
    const ride = await rideController.deleteById(req.params.id);
    return ride ? res.json(ride) : res.sendStatus(400);
  } catch (err) {
    next(err);
  }
});

export { router as rideRouter };
