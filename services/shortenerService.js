import cacache from 'cacache';
import { nanoid } from 'nanoid';

import * as ShortenerUtil from '../util/shortener';

export const createAndSaveURL = async (data) => {
  const { url } = data;

  const key = nanoid(6);
  await cacache.put(process.env.CACHE_PATH, key, url);

  const cutlifiedUrl = `${process.env.HOST}/${key}`;
  return { cutlifiedUrl };
};

export const extractTokenFromParams = (params) => {
  const token = params['0'];
  if (!token || token.length < 6) {
    throw new Error('Please provide valid "Cutlified" url!');
  }
  return token;
};

export const getOriginalURL = async (token) => {
  const entity = await cacache.get(process.env.CACHE_PATH, token);
  if (!entity) {
    throw new Error('Url with that key was not found!');
  }
  let url = entity.data.toString();
  url = ShortenerUtil.appendProtocolToUrlIfDoesntExist(url);
  return url;
};
