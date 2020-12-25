import {Router, Request, Response} from 'express';

export const router = Router();

interface RequestWithBody extends Request {
  body: {[key: string]: string | undefined};
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
router.get('/login', (req: Request, res: Response): void => {
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
})