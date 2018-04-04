import * as mongoose from 'mongoose';
import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as http from 'http';
import { router } from './router';
import { userRouter } from './user/users.router';
import { rideRouter } from './ride/rides.router';
import { config } from './config';

(<any>mongoose).Promise = Promise;
mongoose.connect(config.mongodbUrl, (err) => {
  if (err) {
    console.log(`Error connection to ${config.mongodbUrl}. ${err}`);
  } else {
    console.log(`Succeesfully connected to: ${config.mongodbUrl}`);
  }
});
mongoose.set('debug', process.env.NODE_ENV === 'dev' ? true : false);

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', `${config.client.host}:${config.client.port}`);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Pass to next layer of middleware
  next();
});

app.use('/', router);
app.use('/user', userRouter);
app.use('/ride', rideRouter);

// Error handler.
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'dev') console.error(err);
  if (err.name === 'ValidationError' || err.name === 'CastError' ||
      err.message === 'Bad request' || err.name === 'SyntaxError' ||
     (err.name === 'MongoError' && err.code === 11000)) res.sendStatus(400);
  else res.sendStatus(500);
});

const server = app.listen(+config.port, () => {
  console.log(`Server listening on port ${server.address().port}`);
});
