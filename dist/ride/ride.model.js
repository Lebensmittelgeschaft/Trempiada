"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const rideSchema = new mongoose.Schema({
    user: String,
    maxRiders: Number,
    currentRiders: Number,
    from: String,
    to: String,
    departure: Number,
});
exports.ride = mongoose.model('ride', rideSchema);
