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
router.get('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        res.json(yield ride_manager_1.rideController.getAll());
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
}));
/* GET all rides that are yet to depart. */
router.get('/active', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        res.json(yield ride_manager_1.rideController.getAllBeforeDeparture());
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
}));
/* GET a ride. */
router.get('/:id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        res.json(yield ride_manager_1.rideController.getById(req.query.id));
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
}));
/* POST a ride. */
router.post('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const ride = new ride_model_1.ride({
        user: req.body.user,
        maxRiders: req.body.maxRiders,
        currentRiders: req.body.currentRiders,
        from: req.body.from,
        to: req.body.to,
        departure: req.body.departure,
    });
    try {
        yield ride.save();
        console.log(`Ride ${ride._id} saved.`);
        res.status(200).send();
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
}));
/* DELETE a ride. */
router.delete('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield ride_manager_1.rideController.deleteById(req.body.id);
        console.log(`Deleted ride ${req.body.id}.`);
        res.status(200).send();
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
}));
router.put('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const ride = {
            user: req.body.user,
            maxRiders: req.body.maxRiders,
            currentRiders: req.body.currentRiders,
            from: req.body.from,
            to: req.body.to,
            departure: req.body.departure,
        };
        yield ride_manager_1.rideController.updateById(req.body.id, ride);
        console.log(`Updated ride ${req.body.id}.`);
        res.status(200).send();
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
}));
