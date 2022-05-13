import { nanoid } from 'nanoid';
import { NotFoundError, UnprocessableEntityError } from '../errors';
import * as ShortenerUtils from '../util/shortener';
import UrlRepository from '../repositories/UrlRepository';

export const createAndSaveURL = async (data) => {
  const { url } = data;
  ShortenerUtils.checkUrlCorrectness(url);

  const token = nanoid(6);
  await UrlRepository.create({ token, originalUrl: url });

  const cutlifiedUrl = `${process.env.HOST}/${token}`;
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
    const entity = await UrlRepository.getOne({ token });
    let url = entity.originalUrl;
    url = ShortenerUtils.appendProtocolToUrlIfDoesntExist(url);
    return url;
  } catch (e) {
    throw new NotFoundError('Url with that key was not found!');
  }
};
