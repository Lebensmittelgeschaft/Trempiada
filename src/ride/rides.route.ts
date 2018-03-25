import * as express from 'express';
import { Ride } from './ride.model';
import { IRide } from './ride.interface';
import { rideController } from './ride.controller';
import { IUser } from '../user/user.interface';
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.json(await rideController.getAll());
    next();
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    res.json(await rideController.getById(req.params.id));
    next();
  } catch (err) {
    next(err);
  }
});

router.put('/:id/cancel', async (req, res, next) => {
  try {
    await rideController.cancelRide(req.params.id);
    res.sendStatus(200);
    next();
  } catch (err) {
    next(err);
  }
});

router.put('/:id/joinRide', async (req, res, next) => {
  try {
    const ride = await rideController.addRider(req.params.id, req.body.user);
    if (ride) {
      res.sendStatus(200);
      next();
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:id/leaveRide', async (req, res, next) => {
  try {
    const ride = await rideController.deleteRider(req.params.id, req.body.user);
    if (ride) {
      res.sendStatus(200);
      next();
    }
  } catch (err) {
    next(err);
  }
});

export { router as rideRouter };