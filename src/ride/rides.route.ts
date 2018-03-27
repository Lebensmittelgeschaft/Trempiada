import * as express from 'express';
import { Ride } from './ride.model';
import { IRide } from './ride.interface';
import { rideController } from './ride.controller';
import { IUser } from '../user/user.interface';
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.json(await rideController.getAll());
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const ride = await rideController.getById(req.params.id);
    if (ride) {
      res.json(ride);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
});

router.get('/active/:id', async (req, res, next) => {
  try {
    const activeUserRides = await rideController.getUserActiveRides(req.params.id);
    if (activeUserRides) {
      res.json(activeUserRides);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const ride = await rideController.save(new Ride({
      driver: req.body.driver,
      maxRiders: parseInt(req.body.maxRiders),
      from: req.body.from,
      to: req.body.to,
      departureDate: new Date(parseInt(req.body.departureDate)),
    }));

    if (ride) {
      res.json(ride);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const ride = await rideController.updateById(req.params.id, {
      from: req.body.from,
      to: req.body.to,
      departureDate: req.body.departureDate,
    });

    if (ride) {
      res.json(ride);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:id/join', async (req, res, next) => {
  try {
    const ride = await rideController.addRider(req.params.id, req.body.user);
    if (ride) {
      res.json(ride);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:id/leave', async (req, res, next) => {
  try {
    const ride = await rideController.deleteRider(req.params.id, req.body.user);
    if (ride) {
      res.json(ride);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const ride = await rideController.deleteById(req.params.id);
    if (ride) {
      res.json(ride);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:id/cancel', async (req, res, next) => {
  try {
    const ride = await rideController.cancelRide(req.params.id);
    if (ride) {
      res.json(ride);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
});

export { router as rideRouter };
