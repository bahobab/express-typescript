import express from 'express';
import bodyParser from 'body-parser';
import cookieSesion from 'cookie-session';

import {router} from './routes/loginRoutes';

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSesion({keys: ['fjfdkfmdmd']}));
app.use(router);



app.listen(3000, () => console.log('Server listening port 3000'));