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
require("mocha");
const chai_1 = require("chai");
const ride_manager_1 = require("./ride.manager");
const ride_model_1 = require("./ride.model");
const mongoose = require("mongoose");
const config_1 = require("../config");
mongoose.Promise = Promise;
mongoose.connect(config_1.config.mongodbUrl, { useMongoClient: true }, (err) => {
    if (err) {
        console.log(`Error connection to ${config_1.config.mongodbUrl}. ${err}`);
    }
    else {
        console.log(`Succeesfully connected to: ${config_1.config.mongodbUrl}`);
    }
});
before('Clear rides DB.', () => __awaiter(this, void 0, void 0, function* () {
    try {
        yield ride_model_1.ride.remove({});
    }
    catch (err) {
        console.log(err);
    }
}));
describe('Ride', () => {
    let rideId;
    it('Should create a ride.', () => __awaiter(this, void 0, void 0, function* () {
        const ride = new ride_model_1.ride({
            user: '0',
            maxRiders: 4,
            currentRiders: 1,
            from: 'dolphin',
            to: 'tel aviv',
            departureTime: 1716179465155,
        });
        const savedRide = yield ride.save();
        chai_1.expect(savedRide).to.exist;
        rideId = savedRide._id;
    }));
    it('Should find ride.', () => __awaiter(this, void 0, void 0, function* () {
        const ride = yield ride_manager_1.rideController.getById(rideId);
        chai_1.expect(ride).to.exist;
        chai_1.expect(ride).to.have.property('user');
        chai_1.expect(ride.user).to.have.property('_id', '0');
        chai_1.expect(ride).to.have.property('maxRiders', 4);
        chai_1.expect(ride).to.have.property('currentRiders', 1);
        chai_1.expect(ride).to.have.property('from', 'dolphin');
        chai_1.expect(ride).to.have.property('to', 'tel aviv');
        chai_1.expect(ride).to.have.property('departureTime', 1716179465155);
    }));
    it('Should update ride.', () => __awaiter(this, void 0, void 0, function* () {
        const updatedRide = {
            to: 'yavne',
        };
        const rideResult = yield ride_manager_1.rideController.updateById(rideId, updatedRide);
        chai_1.expect(rideResult).to.exist;
        chai_1.expect(rideResult).to.have.property('to', 'yavne');
    }));
    it('Should delete ride.', () => __awaiter(this, void 0, void 0, function* () {
        chai_1.expect(yield ride_manager_1.rideController.deleteById(rideId)).to.exist;
    }));
});
