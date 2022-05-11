import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import 'dotenv/config';

import controller from './Controllers';
import cronJob from './util/cron';

const jsonParser = bodyParser.json();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(jsonParser);
app.use(morgan());
app.use('/', controller);

app.listen(PORT, () => {
  cronJob.start();
  console.log(`App listening on port ${PORT}`);
});
