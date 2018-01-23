"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    hasCar: {
        type: Boolean,
        required: true,
    },
}, { _id: false });
exports.user = mongoose.model('User', userSchema);