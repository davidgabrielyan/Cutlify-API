/* eslint-disable consistent-return */
import express from 'express';

import * as ShortenerService from '../services/shortenerService';

const Router = express.Router();

Router.post('/', async (req, res) => {
  try {
    const result = await ShortenerService.createAndSaveURL({ ...req.body });
    res.status(200).json(result);
  } catch (e) {
    res.status(403).json({ message: e.message });
  }
});

Router.get('/*', async (req, res) => {
  try {
    const token = ShortenerService.extractTokenFromParams(req.params);
    const originalUrl = await ShortenerService.getOriginalURL(token);
    return res.status(301).redirect(originalUrl);
  } catch (e) {
    res.status(403).json({ message: e.message });
  }
});

export default Router;
