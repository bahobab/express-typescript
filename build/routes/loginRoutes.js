"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
exports.router = express_1.Router();
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403).redirect('/login');
}
exports.router.get('/', (req, res) => {
    if (req.session && req.session.loggedIn) {
        res.send(`
      <div>
        <div>Yah! You're logged in...</div>
        <a href="/logout">logout</a>
      </div>
    `);
    }
    else {
        res.send(`
    <div>
        <div>Yah! You're NOT logged in...</div>
        <a href="/login">Go to login</a>
      </div>
    `);
    }
});
exports.router.get('/login', (req, res) => {
    res.send(`
    <form method="post">
      <div>
        <label>Email:
          <input name="email" />
        </label>
      </div>
      <div>
        <label>Password:
          <input name="password" type="password" />
        </label>
      </div>
      <div>
        <button>Login...</button>
      </div>
    </form>
  `);
});
exports.router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email && password && email === 'toto@toto.com' && password === 'password') {
        req.session = { loggedIn: true };
        res.redirect('/');
    }
    else {
        res.send('OOps! login failed!!');
    }
});
exports.router.get('/logout', (req, res) => {
    req.session = undefined;
    res.redirect('/login');
});
exports.router.get('/protected', requireAuth, (req, res) => {
    res.send('Welcome to protected page, authorized user!');
});
