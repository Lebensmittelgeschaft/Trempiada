"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const users_route_1 = require("./user/users.route");
const rides_route_1 = require("./ride/rides.route");
const router = express.Router();
/* GET home page. */
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/index.html'));
});
function getRoutes(app) {
    app.use('/', router);
    app.use('/users', users_route_1.router);
    app.use('/rides', rides_route_1.router);
    return app;
}
exports.getRoutes = getRoutes;
