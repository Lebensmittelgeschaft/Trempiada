import * as express from 'express';
import { Ride } from './ride.model';
import { IRide } from './ride.interface';
import { rideController } from './ride.controller';
import { IUser } from '../user/user.interface';
const router = express.Router();

export function rideRouter() {

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
      res.sendStatus(200);
      next();
    } catch (err) {
      next(err);
    }
  });

  router.put('/:id/joinRide', async (req, res, next) => {
    try {
      let ride = await rideController.getById(req.params.id);
      if (ride) {
        if (ride.riders.length + 1 <= ride.maxRiders) {
          ride = await rideController.addRider(req.params.id, req.body.user);
          if (ride) {
            res.sendStatus(200);
            next();
          } else {
            throw new Error(`Couldn't add user to the ride.`);
          }
        } else {
          throw new Error(`Couldn't join a full ride.`);
        }
      } else {
        throw new Error(`Couldn't find ride.`);
      }
    } catch (err) {
      next(err);
    }
  });

  router.put('/:id/leaveRide', async (req, res, next) => {
    try {
      let ride = await rideController.getById(req.params.id);
      if (ride) {
        if (ride.riders.map(x => (<IUser>x.rider).id).indexOf(req.body.user) !== -1) {
          ride = await rideController.deleteRider(req.params.id, req.body.user);
          if (ride) {
            res.sendStatus(200);
            next();
          } else {
            throw new Error(`Couldn't remove user from the ride.`);
          }
        } else {
          throw new Error(`Couldn't find user in ride.`);
        }
      } else {
        throw new Error(`Couldn't find ride.`);
      }
    } catch (err) {
      next(err);
    }
  });

  return router;
}
