/* eslint-disable consistent-return */
import express from 'express';
import cacache from 'cacache';

const Router = express.Router();

Router.post('/', async (req, res) => {
  try {
    const { url } = req.body;

    const key = `_${Math.random().toString(36).substring(2, 7)}`;
    await cacache.put(process.env.CACHE_PATH, key, url);

    const cutlifiedUrl = `${process.env.HOST}/${key}`;

    res.status(200).json({ cutlifiedUrl });
  } catch (e) {
    res.status(403).json({ message: e.message });
  }
});

Router.get('/*', async (req, res) => {
  try {
    const key = req.params['0'];
    if (!key || key.length < 6) {
      return res.status(400).json({ message: 'Please provide valid "Cutlified" url!' });
    }

    const entity = await cacache.get(process.env.CACHE_PATH, key);
    if (!entity) {
      return res.status(404).json({ message: 'Url with that key was not found!' });
    }

    let url = entity.data.toString();
    if (!(/^(http|https):\/\//gm.test(url))) {
      url = `http://${url}`;
    }

    return res.status(301).redirect(url);
  } catch (e) {
    res.status(403).json({ message: 'Unfortunately, your link has expired...' });
  }
});

export default Router;
