import {Request, Response} from 'express'

import { controller } from './decorators/controller';
import {get} from './decorators/routes';

@controller('/auth')
class LoginController {
  @get('/login')
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
}

