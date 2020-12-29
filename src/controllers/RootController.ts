import {Request, Response} from 'express';
import { controller, get } from './decorators';

@controller('')
export class RootController {
  @get('/')
  getRoot(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.send(`
        <div>
          <div>Yah! You're logged in...</div>
          <a href="/auth/logout">logout</a>
        </div>
      `)
    } else {
      res.send(`
      <div>
          <div>Yah! You're NOT logged in...</div>
          <a href="/auth/login">Go to login</a>
        </div>
      `);
    }
  }
}