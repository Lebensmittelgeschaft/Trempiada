import * as express from 'express';
import { ride as Ride } from './ride.model';
import { IRide } from './ride.interface';
import { rideController } from './ride.manager';
import { config } from '../config';
const router = express.Router();

/* GET all rides. */
router.get('/', async (req, res, next) => {
  try {
    res.json(await rideController.getAll());
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

/* GET all rides that are yet to depart. */
router.get('/active', async (req, res, next) => {
  try {
    res.json(await rideController.getAllBeforeDeparture());
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

/* GET a ride. */
router.get('/:id', async (req, res, next) => {
  try {
    res.json(await rideController.getById(req.query.id));
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

/* POST a ride. */
router.post('/', async (req, res, next) => {
  const ride = new Ride({
    user: req.body.user,
    maxRiders: req.body.maxRiders,
    currentRiders: req.body.currentRiders,
    from: req.body.from,
    to: req.body.to,
    departure: req.body.departure,
  });

  try {
    await ride.save();
    console.log(`Ride ${ride._id} saved.`);
    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

/* DELETE a ride. */
router.delete('/', async (req, res, next) => {
  try {
    await rideController.deleteById(req.body.id);
    console.log(`Deleted ride ${req.body.id}.`);
    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.put('/', async (req, res, next) => {
  try {
    const ride: Partial<IRide> = {
      user: req.body.user,
      maxRiders: req.body.maxRiders,
      currentRiders: req.body.currentRiders,
      from: req.body.from,
      to: req.body.to,
      departure: req.body.departure,
    };

    await rideController.updateById(req.body.id, ride);
    console.log(`Updated ride ${req.body.id}.`);
    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

export { router };
