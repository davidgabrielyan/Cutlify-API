import { UnprocessableEntityError } from '../errors';
import { URL_REGEX, PROTOCOL_REGEX } from '../resources/regex';

export const appendProtocolToUrlIfDoesntExist = (url) => {
  let completeUrl = url;
  if (!(PROTOCOL_REGEX.test(completeUrl))) {
    completeUrl = `http://${completeUrl}`;
  }
  return completeUrl;
};

export const checkUrlCorrectness = (url) => {
  if (URL_REGEX.test(url)) {
    return true;
  }
  throw new UnprocessableEntityError('Please provide valid URL!');
};
