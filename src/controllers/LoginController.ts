import {Request, Response, NextFunction} from 'express';

import { controller, get, use, bodyValidator, post } from './decorators';

function logger (req: Request, res: Response, next: NextFunction) {
  console.log('Middleware called...');
  next();
}
@controller('/auth')
class LoginController {
  @get('/login')
  @use(logger)
  getLogin(req: Request, res: Response): void  {
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
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response): void {
    const {email, password} = req.body;
  
    if (email && password && email === 'toto@toto.com' && password === 'password') {
      req.session = {loggedIn: true};
      res.redirect('/');
    } else {
      res.send('OOps! login failed!!');
    }
  }

  @get('/logout')
  getLogout (req: Request, res: Response) {
    req.session = undefined;
    res.redirect('/auth/login');
  }
  
  
}

