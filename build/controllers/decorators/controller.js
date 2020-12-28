"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
var AppRouter_1 = require("../../AppRouter");
var MetadataKeys_1 = require("./MetadataKeys");
function controller(routePrefix) {
    var router = AppRouter_1.AppRouter.getIstance();
    return function (target) {
        for (var key in target.prototype) {
            var routeHandler = target.prototype[key];
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.PATH, routePrefix, target, key);
            var path = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.PATH, target.prototype, key);
            var method = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.METHOD, target.prototype, key);
            if (path) {
                router[method]("" + routePrefix + path, routeHandler);
            }
        }
    };
}
exports.controller = controller;
