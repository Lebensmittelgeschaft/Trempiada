import * as express from 'express';
import { ride as Ride } from './ride.model';
import { IRide } from './ride.interface';
import { rideController } from './ride.manager';
import { config } from '../config';
const router = express.Router();

/* GET all rides. */
router.get('/', async (req, res) => {
  let rides: IRide[] | null = null;
  if (req.body.active && req.body.active === true) {
    rides = await rideController.getAllBeforeDeparture();
  } else {
    rides = await rideController.getAll();
  }

  if (rides) {
    res.json(rides);
  } else {
    res.sendStatus(500);
  }
});

/* GET all rides that are yet to depart. */
/* router.get('/active', async (req, res) => {
  const rides = await rideController.getAllBeforeDeparture();
  if (rides) {
    res.json(rides);
  } else {
    res.sendStatus(500);
  }
}); */

/* GET a ride. */
router.get('/:id', async (req, res) => {
  if (!req.params.id || typeof req.params.id !== 'string') {
    res.sendStatus(400);
  } else {
    const ride = await rideController.getById(req.params.id);
    if (ride) {
      res.json(ride);
    } else {
      res.sendStatus(404); // 500?
    }
  }
});

/* POST a ride. */
router.post('/', async (req, res) => {

  // Checks if there's any invalid field.
  if (!req.body.driver ||
    !req.body.maxRiders ||
    !req.body.from ||
    !req.body.to ||
    !req.body.departureTime ||
    (req.body.riders && typeof req.body.riders !== 'object') ||
    typeof req.body.driver !== 'string' ||
    typeof req.body.maxRiders !== 'number' ||
    typeof req.body.from !== 'string' ||
    typeof req.body.to !== 'string') {
    res.sendStatus(400);
  } else {
    const rideToSave = new Ride({
      driver: req.body.driver,
      maxRiders: req.body.maxRiders,
      riders: req.body.riders,
      from: req.body.from,
      to: req.body.to,
      departureTime: req.body.departureTime,
    });

    const ride = await rideController.save(rideToSave);
    if (ride) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  }
});

/* DELETE a ride. */
router.delete('/:id', async (req, res) => {
  if (!req.params.id || typeof req.params.id !== 'string') {
    res.sendStatus(400);
  } else {
    const ride = await rideController.deleteById(req.params.id);
    if (ride) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  }
});

router.put('/:id', async (req, res) => {

  // Checks if there's any invalid field.
  if (!req.params.id ||
    !req.body.driver ||
    !req.body.maxRiders ||
    !req.body.from ||
    !req.body.to ||
    !req.body.departureTime ||
    (req.body.riders && typeof req.body.riders !== 'object') ||
    typeof req.body.driver !== 'string' ||
    typeof req.body.maxRiders !== 'number' ||
    typeof req.body.from !== 'string' ||
    typeof req.body.to !== 'string' ||
    typeof req.body.departureTime !== 'number') {
    res.sendStatus(400);
  } else {
    const rideToUpdate: Partial<IRide> = {
      driver: req.body.driver,
      maxRiders: req.body.maxRiders,
      riders: req.body.riders,
      from: req.body.from,
      to: req.body.to,
      departureTime: req.body.departureTime,
    };

    const ride = await rideController.updateById(req.params.id, rideToUpdate);
    if (ride) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  }
});

export { router };
