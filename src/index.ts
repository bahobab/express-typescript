import express from 'express';
import bodyParser from 'body-parser';
import cookieSesion from 'cookie-session';

import {AppRouter} from './AppRouter';

import './controllers/LoginController'
import './controllers/RootController';
import './controllers/ProtectedController';


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSesion({keys: ['fjfdkfmdmd']}));
app.use(AppRouter.getIstance());


app.listen(3000, () => console.log('Server listening port 3000'));