"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = exports.router = void 0;
require("reflect-metadata");
var express_1 = require("express");
exports.router = express_1.Router();
function controller(routePrefix) {
    return function (target) {
        for (var key in target.prototype) {
            var routeHandler = target.prototype[key];
            Reflect.defineMetadata('path', routePrefix, target, key);
            var path = Reflect.getMetadata('path', target.prototype, key);
            if (path) {
                exports.router.get("" + routePrefix + path, routeHandler);
            }
        }
    };
}
exports.controller = controller;
