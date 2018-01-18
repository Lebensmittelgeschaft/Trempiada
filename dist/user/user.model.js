"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    _id: String,
    location: String,
    hasCar: Boolean,
}, { _id: false });
exports.user = mongoose.model('user', userSchema);
