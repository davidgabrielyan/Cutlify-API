import cacache from 'cacache';
import { nanoid } from 'nanoid';
import { NotFoundError, UnprocessableEntityError } from '../errors';
import * as ShortenerUtils from '../util/shortener';

export const createAndSaveURL = async (data) => {
  const { url } = data;
  ShortenerUtils.checkUrlCorrectness(url);

  const key = nanoid(6);
  await cacache.put(process.env.CACHE_PATH, key, url);

  const cutlifiedUrl = `${process.env.HOST}/${key}`;
  return { cutlifiedUrl };
};

export const extractTokenFromParams = (params) => {
  const token = params['0'];
  if (!token || token.length < 6) {
    throw new UnprocessableEntityError('Please provide valid "Cutlified" url!');
  }
  return token;
};

export const getOriginalURL = async (token) => {
  try {
    const entity = await cacache.get(process.env.CACHE_PATH, token);
    let url = entity.data.toString();
    url = ShortenerUtils.appendProtocolToUrlIfDoesntExist(url);
    return url;
  } catch (e) {
    throw new NotFoundError('Url with that key was not found!');
  }
};
