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
router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const users = yield user_manager_1.userController.getAll();
    if (users) {
        res.json(users);
    }
    else {
        res.sendStatus(500);
    }
}));
/* GET a user. */
router.get('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (!req.params.id || typeof req.params.id !== 'string') {
        res.sendStatus(400);
    }
    else {
        const user = yield user_manager_1.userController.getById(req.params.id);
        if (user) {
            res.json(user);
        }
        else {
            res.sendStatus(404);
        }
    }
}));
/* POST a user. */
router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (!req.body.id ||
        !req.body.address ||
        !req.body.hasCar ||
        (typeof req.body.id !== 'string' ||
            typeof req.body.address !== 'string' ||
            typeof req.body.hasCar !== 'boolean')) {
        res.sendStatus(400);
    }
    else {
        const userToSave = new user_model_1.user({
            _id: req.body.id,
            address: req.body.address,
            hasCar: req.body.hasCar,
        });
        const user = yield user_manager_1.userController.save(userToSave);
        if (user) {
            res.sendStatus(200);
        }
        else {
            res.sendStatus(500);
        }
    }
}));
/* DELETE a user. */
router.delete('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (!req.params.id || typeof req.params.id !== 'string') {
        res.sendStatus(400);
    }
    else {
        const user = yield user_manager_1.userController.deleteById(req.params.id);
        if (user) {
            res.sendStatus(200);
        }
        else {
            res.sendStatus(404);
        }
    }
}));
/* UPDATE a user's data. */
router.put('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (!req.params.id ||
        !req.body.address ||
        !req.body.hasCar ||
        typeof req.params.id !== 'string' ||
        typeof req.body.address !== 'string' ||
        typeof req.body.hasCar !== 'boolean') {
        res.sendStatus(400);
    }
    else {
        const userToUpdate = {
            address: req.body.address,
            hasCar: req.body.hasCar,
        };
        const user = yield user_manager_1.userController.updateById(req.params.id, userToUpdate);
        if (user) {
            res.sendStatus(200);
        }
        else {
            res.sendStatus(500);
        }
    }
}));
