import * as express from 'express';
import { Ride } from './ride.model';
import * as mongoose from 'mongoose';
import { IRide } from './ride.interface';
import { config } from '../config';
const router = express.Router();

/* GET all rides. */
router.get('/', async (req, res) => {
  /*let rides: IRide[] = [];
  try {
    if (req.query.active && req.query.active === 'true') {
      rides = await rideController.getAllBeforeDeparture();
    } else {
      rides = await rideController.getAll();
    }

    res.json(rides);
  } catch (err) {
    res.sendStatus(500);
  }*/
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
  /*if (!req.params.id) {
    res.sendStatus(400);
  } else {
    try {
      const ride = await rideController.getById(req.params.id);
      if (ride) {
        res.json(ride);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      res.sendStatus(500);
    }
  }*/
});

/* POST a ride. */
router.post('/', async (req, res) => {

  // Checks if there's any invalid field.
  /*if (!req.body.driver ||
    !req.body.maxRiders ||
    !req.body.from ||
    !req.body.to ||
    !req.body.departureTime) {
    res.sendStatus(400);
  } else {
    try {
      const rideToSave = new Ride({
        driver: req.body.driver,
        maxRiders: req.body.maxRiders,
        riders: JSON.parse(req.body.riders),
        from: req.body.from,
        to: req.body.to,
        departureTime: req.body.departureTime,
      });

      const ride = await rideController.save(rideToSave);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  }*/
});

/* DELETE a ride. */
router.delete('/:id', async (req, res) => {
  /*if (!req.params.id) {
    res.sendStatus(400);
  } else {
    try {
      const ride = await rideController.deleteById(req.params.id);
      if (ride) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      res.sendStatus(500);
    }
  }*/
});

router.put('/:id', async (req, res) => {

  // Checks if there's any invalid field.
  /*if (!req.params.id ||
    !req.body.driver ||
    !req.body.maxRiders ||
    !req.body.from ||
    !req.body.to ||
    !req.body.departureTime) {
    res.sendStatus(400);
  } else {
    const rideToUpdate: Partial<IRide> = {
      driver: req.body.driver,
      maxRiders: req.body.maxRiders,
      riders: JSON.parse(req.body.riders),
      from: req.body.from,
      to: req.body.to,
      departureTime: req.body.departureTime,
    };

    try {
      const ride = await rideController.updateById(req.params.id, rideToUpdate);
      if (ride) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      res.sendStatus(500);
    }
  }*/
});

router.put('/:ride/rider/:user', async (req, res) => {

  // Checks if there's any invalid field.
  /*if (!req.params.ride || !req.params.user) {
    res.sendStatus(400);
  } else {
    try {
      const ride = await rideController
      .addRider(req.params.ride, req.params.user);
      if (ride) {
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
