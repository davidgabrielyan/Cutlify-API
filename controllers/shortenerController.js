/* eslint-disable consistent-return */
import express from 'express';
import * as ShortenerService from '../services/shortenerService';
import httpCodes from '../resources/httpCodes';

const Router = express.Router();

Router.post('/', async (req, res) => {
  try {
    const result = await ShortenerService.createAndSaveURL({ ...req.body });
    res.status(httpCodes.created).json(result);
  } catch (e) {
    res.status(e.code).json({ message: e.message });
  }
});

Router.get('/*', async (req, res) => {
  try {
    const token = ShortenerService.extractTokenFromParams(req.params);
    const originalUrl = await ShortenerService.getOriginalURL(token);
    return res.redirect(originalUrl);
  } catch (e) {
    res.status(e.code).json({ message: e.message });
  }
});

export default Router;
