"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patch = exports.del = exports.put = exports.post = exports.get = void 0;
require("reflect-metadata");
var Method_1 = require("./Method");
var MetadataKeys_1 = require("./MetadataKeys");
function routeBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.PATH, path, target, key);
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.METHOD, method, target, key);
        };
    };
}
exports.get = routeBinder(Method_1.Methods.GET);
exports.post = routeBinder(Method_1.Methods.POST);
exports.put = routeBinder(Method_1.Methods.PUT);
exports.del = routeBinder(Method_1.Methods.DELETE);
exports.patch = routeBinder(Method_1.Methods.PATCH);
