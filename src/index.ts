import express from 'express';
import bodyParser from 'body-parser';
import cookieSesion from 'cookie-session';

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSesion({keys: ['fjfdkfmdmd']}));

app.get('/', (req, res) => {
  res.send('Hello');
})

app.listen(3000, () => console.log('Server listening port 3000'));