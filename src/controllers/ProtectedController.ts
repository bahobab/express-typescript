import {Request, Response, NextFunction} from 'express';
import { controller, get, use } from './decorators';


interface RequestWithBody extends Request {
  body: {[key: string]: string | undefined};
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  } 
  res.status(403).redirect('/login');
}

@controller('')
export class ProtectedController {
  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send('Welcome to protected page, authorized user!');
  }
}