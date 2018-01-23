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
const ride_model_1 = require("./ride.model");
exports.rideController = {
    getAll() {
        return ride_model_1.ride.find({})
            .then((res) => {
            return res;
        })
            .catch((err) => {
            console.error(err);
            return null;
        });
    },
    getAllBeforeDeparture() {
        return __awaiter(this, void 0, void 0, function* () {
            const rides = yield exports.rideController.getAll();
            const now = new Date().getTime();
            return rides ? rides.filter(r => now < r.departure) : null;
        });
    },
    getById(id) {
        return ride_model_1.ride.findById(id)
            .then((res) => {
            return res;
        })
            .catch((err) => {
            console.error(err);
            return null;
        });
    },
    deleteById(id) {
        return ride_model_1.ride.findByIdAndRemove(id)
            .then((res) => {
            return res;
        })
            .catch((err) => {
            console.error(err);
            return null;
        });
    },
    updateById(id, ride) {
        return ride_model_1.ride.findByIdAndUpdate(id, ride, { new: true })
            .then((res) => {
            return res;
        })
            .catch((err) => {
            console.error(err);
            return null;
        });
    },
};
