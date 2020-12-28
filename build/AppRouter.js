"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRouter = void 0;
var express_1 = require("express");
var AppRouter = /** @class */ (function () {
    function AppRouter() {
    }
    AppRouter.getIstance = function () {
        if (!this.instance) {
            this.instance = express_1.Router();
        }
        return this.instance;
    };
    return AppRouter;
}());
exports.AppRouter = AppRouter;
