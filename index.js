import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import 'dotenv/config';
import shortener from './controllers/shortenerController';
import cronJob from './services/cronService';
import errorHandler from './middlewares/errorHandler';
import { LOG_FORMAT } from './resources/constants';

const jsonParser = bodyParser.json();

const PORT = process.env.PORT || 3000;

const app = express();

// Helper middlewares and routes
app.use(cors());
app.use(jsonParser);
app.use(morgan(LOG_FORMAT));

app.use('/', shortener);

app.use(errorHandler);

app.listen(PORT, () => {
  cronJob.start();
  console.log(`App listening on port ${PORT}`);
});
