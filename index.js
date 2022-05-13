/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import 'dotenv/config';
import shortener from './controllers/shortenerController';
import cronJob from './services/cronService';
import errorHandler from './middlewares/errorHandler';
import { LOG_FORMAT, MONGO_CONNECTION_URL } from './resources/constants';

const jsonParser = bodyParser.json();

const PORT = process.env.PORT || 3000;

const app = express();

// Helper middlewares and routes
app.use(cors());
app.use(jsonParser);
app.use(morgan(LOG_FORMAT));

app.use('/', shortener);

app.use(errorHandler);

const db = mongoose.connect(
  MONGO_CONNECTION_URL
    .replace('<username>', process.env.MONGO_USERNAME)
    .replace('<password>', process.env.MONGO_PASSWORD),
  { maxPoolSize: 10 },
);

if (!db) {
  console.info('Error connecting db');
  process.exit(1);
} else {
  console.log('DB connected successfully');
}

app.listen(PORT, () => {
  cronJob.start();
  console.log(`App listening on port ${PORT}`);
});
