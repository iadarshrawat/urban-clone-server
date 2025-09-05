"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv')
    .config();
var express_1 = require("express");
var app_1 = require("./src/loaders/app");
var database_1 = require("./src/loaders/database");
var routers_1 = require("./src/routers");
process.on('uncaughtException', function (err) {
    console.log(' UNCAUGHT EXCEPTION ');
    console.log('[Inside \'uncaughtException\' event] ' + err.stack || err.message);
});
process.on('unhandledRejection', function (reason, promise) {
    console.log(' UNHANDLED REJECTION ');
    console.log('Unhandled Rejection at: ', promise, 'REASON: ', reason);
});
var app = (0, express_1.default)();
(0, database_1.databaseLoader)()
    .then(function () { return (0, app_1.appLoader)(app, routers_1.router); })
    .catch(function (error) {
    process.exit(1);
});
