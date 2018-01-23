"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const ride_model_1 = require("./ride.model");
const ride_manager_1 = require("./ride.manager");
const router = express.Router();
exports.router = router;
/* GET all rides. */
router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let rides = null;
    if (req.body.active && req.body.active === true) {
        rides = yield ride_manager_1.rideController.getAllBeforeDeparture();
    }
    else {
        rides = yield ride_manager_1.rideController.getAll();
    }
    if (rides) {
        res.json(rides);
    }
    else {
        res.sendStatus(500);
    }
}));
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
router.get('/:id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    if (!req.params.id || typeof req.params.id !== 'string') {
        res.sendStatus(400);
    }
    else {
        const ride = yield ride_manager_1.rideController.getById(req.params.id);
        if (ride) {
            res.json(ride);
        }
        else {
            res.sendStatus(404); // 500?
        }
    }
}));
/* POST a ride. */
router.post('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    // Checks if there's any invalid field.
    if (!req.body.user ||
        !req.body.maxRiders ||
        !req.body.from ||
        !req.body.to ||
        (req.body.currentRiders && typeof req.body.currentRiders !== 'number') ||
        (req.body.departureTime && typeof req.body.departureTime !== 'number') ||
        typeof req.body.user !== 'string' ||
        typeof req.body.maxRiders !== 'number' ||
        typeof req.body.from !== 'string' ||
        typeof req.body.to !== 'string') {
        res.sendStatus(400);
    }
    else {
        const rideToSave = new ride_model_1.ride({
            user: req.body.user,
            maxRiders: req.body.maxRiders,
            currentRiders: req.body.currentRiders,
            from: req.body.from,
            to: req.body.to,
            departureTime: req.body.departureTime,
        });
        const ride = yield ride_manager_1.rideController.save(rideToSave);
        if (ride) {
            res.sendStatus(200);
        }
        else {
            res.sendStatus(500);
        }
    }
}));
/* DELETE a ride. */
router.delete('/:id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    if (!req.params.id || typeof req.params.id !== 'string') {
        res.sendStatus(400);
    }
    else {
        const ride = yield ride_manager_1.rideController.deleteById(req.params.id);
        if (ride) {
            res.sendStatus(200);
        }
        else {
            res.sendStatus(404);
        }
    }
}));
router.put('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    // Checks if there's any invalid field.
    if (!req.params.id ||
        !req.body.user ||
        !req.body.maxRiders ||
        !req.body.from ||
        !req.body.to ||
        !req.body.departureTime ||
        (req.body.currentRiders && typeof req.body.currentRiders !== 'number') ||
        typeof req.body.user !== 'string' ||
        typeof req.body.maxRiders !== 'number' ||
        typeof req.body.from !== 'string' ||
        typeof req.body.to !== 'string' ||
        typeof req.body.departureTime !== 'number') {
        res.sendStatus(400);
    }
    else {
        const rideToUpdate = {
            user: req.body.user,
            maxRiders: req.body.maxRiders,
            currentRiders: req.body.currentRiders,
            from: req.body.from,
            to: req.body.to,
            departureTime: req.body.departureTime,
        };
        const ride = yield ride_manager_1.rideController.updateById(req.params.id, rideToUpdate);
        if (ride) {
            res.sendStatus(200);
        }
        else {
            res.sendStatus(500);
        }
    }
}));
