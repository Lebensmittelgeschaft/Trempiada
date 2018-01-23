"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("./user.model");
exports.userController = {
    getAll() {
        return user_model_1.user.find({}).then((res) => {
            return res;
        }).catch((err) => {
            console.error(err);
            return null;
        });
    },
    getById(id) {
        return user_model_1.user.findById(id)
            .then((res) => {
            return res;
        }).catch((err) => {
            console.error(err);
            return null;
        });
    },
    save(user) {
        return user.save()
            .then((res) => {
            return res;
        }).catch((err) => {
            console.error(err);
            return null;
        });
    },
    deleteById(id) {
        return user_model_1.user.findByIdAndRemove(id)
            .then((res) => {
            return res;
        }).catch((err) => {
            console.error(err);
            return null;
        });
    },
    updateById(id, user) {
        return user_model_1.user.findByIdAndUpdate(id, user, { new: true })
            .then((res) => {
            return res;
        })
            .catch((err) => {
            console.error(err);
            return null;
        });
    },
};
