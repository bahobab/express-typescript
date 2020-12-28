"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
var AppRouter_1 = require("../../AppRouter");
function controller(routePrefix) {
    var router = AppRouter_1.AppRouter.getIstance();
    return function (target) {
        for (var key in target.prototype) {
            var routeHandler = target.prototype[key];
            Reflect.defineMetadata('path', routePrefix, target, key);
            var path = Reflect.getMetadata('path', target.prototype, key);
            if (path) {
                router.get("" + routePrefix + path, routeHandler);
            }
        }
    };
}
exports.controller = controller;
