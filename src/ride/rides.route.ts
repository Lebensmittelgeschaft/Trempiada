import * as express from 'express';
import { Ride } from './ride.model';
import { IRide } from './ride.interface';
import { rideController } from './ride.controller';
import { IUser } from '../user/user.interface';
const router = express.Router();

/**
 * /GET /ride
 * Returns all undeleted rides.
 */
router.get('/', async (req, res, next) => {
  try {
    return res.json(await rideController.getAll(parseInt(req.query.page), parseInt(req.query.size)));
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
    const ride = await rideController.getById(req.params.id);
    return ride ? res.json(ride) : res.sendStatus(400);
  } catch (err) {
    next(err);
  }
});

/**
 * /POST /ride
 * Creates a new ride in the database.
 */
router.post('/', async (req, res, next) => {
  try {
    const ride = await rideController.create(new Ride({
      driver: req.body.driver,
      maxRiders: parseInt(req.body.maxRiders),
      from: req.body.from,
      to: req.body.to,
      departureDate: new Date(parseInt(req.body.departureDate)),
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
router.put('/:id', async (req, res, next) => {
  try {
    const ride = await rideController.updateById(req.params.id, {
      from: req.body.from,
      to: req.body.to,
      departureDate: req.body.departureDate,
    });

    return ride ? res.json(ride) : res.sendStatus(400);
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
    const ride = await rideController.deleteRider(req.params.id, req.body.user);
    return ride ? res.json(ride) : res.sendStatus(400);
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /ride/5ab755.../cancel
 * Cancels a ride and sends a notification to all its riders.
 */
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
router.delete('/:id', async (req, res, next) => {
  try {
    const ride = await rideController.deleteById(req.params.id);
    return ride ? res.json(ride) : res.sendStatus(400);
  } catch (err) {
    next(err);
  }
});

export { router as rideRouter };
