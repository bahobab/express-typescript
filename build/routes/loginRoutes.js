"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
exports.router = express_1.Router();
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403).redirect('/login');
}
exports.router.get('/', function (req, res) {
    if (req.session && req.session.loggedIn) {
        res.send("\n      <div>\n        <div>Yah! You're logged in...</div>\n        <a href=\"/logout\">logout</a>\n      </div>\n    ");
    }
    else {
        res.send("\n    <div>\n        <div>Yah! You're NOT logged in...</div>\n        <a href=\"/login\">Go to login</a>\n      </div>\n    ");
    }
});
exports.router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email && password && email === 'toto@toto.com' && password === 'password') {
        req.session = { loggedIn: true };
        res.redirect('/');
    }
    else {
        res.send('OOps! login failed!!');
    }
});
exports.router.get('/logout', function (req, res) {
    req.session = undefined;
    res.redirect('/login');
});
exports.router.get('/protected', requireAuth, function (req, res) {
    res.send('Welcome to protected page, authorized user!');
});
