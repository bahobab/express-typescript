import {Router, Request, Response, NextFunction} from 'express';

export const router = Router();

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

router.get('/', (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
      <div>
        <div>Yah! You're logged in...</div>
        <a href="/logout">logout</a>
      </div>
    `)
  } else {
    res.send(`
    <div>
        <div>Yah! You're NOT logged in...</div>
        <a href="/login">Go to login</a>
      </div>
    `);
  }
})



router.post('/login', (req: RequestWithBody, res: Response): void => {
  const {email, password} = req.body;

  if (email && password && email === 'toto@toto.com' && password === 'password') {
    req.session = {loggedIn: true};
    res.redirect('/');
  } else {
    res.send('OOps! login failed!!');
  }
});

router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect('/login');
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send('Welcome to protected page, authorized user!');
});