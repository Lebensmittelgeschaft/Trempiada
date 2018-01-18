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
const user_model_1 = require("./user.model");
const user_manager_1 = require("./user.manager");
const router = express.Router();
exports.router = router;
/* GET all users. */
router.get('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        res.json(yield user_manager_1.userController.getAll());
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
}));
/* GET a user. */
router.get('/:id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        res.json(yield user_manager_1.userController.getById(req.query.id));
    }
    catch (err) {
        console.log(`Error finding user. ${err}`);
        res.status(500).send();
    }
}));
/* POST a user. */
router.post('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = new user_model_1.user({
            _id: req.body.id,
            location: req.body.location,
            hasCar: req.body.hasCar,
        });
        yield user.save();
        console.log(`User ${user._id} saved.`);
        res.status(200).send();
    }
    catch (err) {
        console.log(`Error saving user to DB. ${err}`);
        res.status(500).send();
    }
}));
/* DELETE a user. */
router.delete('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield user_manager_1.userController.deleteById(req.body.id);
        console.log(`Deleted user ${req.body.id}.`);
        res.status(200).send();
    }
    catch (err) {
        console.log(`Error deleting user ${req.body.id}. ${err}`);
        res.status(500).send();
    }
}));
/* UPDATE a user's data. */
router.put('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = {
            location: req.body.location,
            hasCar: req.body.hasCar,
        };
        yield user_manager_1.userController.updateById(req.body.id, user);
        console.log(`Updated user ${req.body.id}.`);
        res.status(200).send();
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
}));
