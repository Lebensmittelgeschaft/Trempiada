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
const user_manager_1 = require("./user.manager");
const user_model_1 = require("./user.model");
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
before('Clear users test DB.', () => __awaiter(this, void 0, void 0, function* () {
    try {
        yield user_model_1.user.remove({});
    }
    catch (err) {
        console.log(err);
    }
}));
describe('User', () => {
    it('Should create a user.', () => __awaiter(this, void 0, void 0, function* () {
        const user = new user_model_1.user({
            _id: '0',
            address: 'tel aviv',
            hasCar: true,
        });
        chai_1.expect(yield user_manager_1.userController.save(user)).to.exist;
    }));
    it('Should find user.', () => __awaiter(this, void 0, void 0, function* () {
        const user = yield user_manager_1.userController.getById('0');
        chai_1.expect(user).to.exist;
        chai_1.expect(user).to.have.property('address', 'tel aviv');
        chai_1.expect(user).to.have.property('hasCar', true);
    }));
    it('Should update user.', () => __awaiter(this, void 0, void 0, function* () {
        const updatedUser = {
            address: 'yavne',
        };
        const userResult = yield user_manager_1.userController.updateById('0', updatedUser);
        chai_1.expect(userResult).to.exist;
        chai_1.expect(userResult).to.have.property('address', 'yavne');
    }));
    it('Should delete user.', () => __awaiter(this, void 0, void 0, function* () {
        chai_1.expect(yield user_manager_1.userController.deleteById('0')).to.exist;
    }));
});
