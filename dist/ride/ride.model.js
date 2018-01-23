"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const rideSchema = new mongoose.Schema({
    user: {
        type: String,
        ref: 'User',
        required: true,
    },
    maxRiders: {
        type: Number,
        required: true,
    },
    currentRiders: {
        type: Number,
        default: 1,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    departureTime: {
        type: Number,
        default: (new Date()).getTime(),
    },
});
exports.ride = mongoose.model('Ride', rideSchema);
