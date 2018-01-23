"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require("http");
const mongoose = require("mongoose");
const router_1 = require("./router");
const config_1 = require("./config");
mongoose.Promise = Promise;
mongoose.connect(config_1.config.mongodbUrl, { useMongoClient: true }, (err) => {
    if (err) {
        console.log(`Error connection to ${config_1.config.mongodbUrl}. ${err}`);
    }
    else {
        console.log(`Succeesfully connected to: ${config_1.config.mongodbUrl}`);
    }
});
const app = express();
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
router_1.getRoutes(app);
app.set('port', config_1.config.port);
const server = http.createServer(app);
server.listen(config_1.config.port);
