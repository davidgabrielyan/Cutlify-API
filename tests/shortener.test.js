import cacache from 'cacache';
import idGenerator from 'nanoid';
import 'dotenv/config';
import * as ShortenerService from '../services/shortenerService';
import * as ShortenerUtils from '../util/shortener';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Shortener Service', () => {
  it('(createAndSaveURL) should throw an error from "cacache"', async() => {
    try {
      jest.spyOn(cacache, 'put').mockImplementation(() => {
        throw new Error('cannot put!');
      });

      jest.spyOn(ShortenerUtils, 'checkUrlCorrectness').mockImplementation(() => true);
  
      jest.spyOn(idGenerator, 'nanoid').mockImplementation(() => 'test12');
  
      await ShortenerService.createAndSaveURL({ url: 'www.test.com' });
    } catch(e) {
      expect(e.message).toEqual('cannot put!');
    }
  });
  it('(createAndSaveURL) should return cutlified URL', async() => {
    jest.spyOn(cacache, 'put').mockImplementation(() => true);

    jest.spyOn(ShortenerUtils, 'checkUrlCorrectness').mockImplementation(() => true);

    jest.spyOn(idGenerator, 'nanoid').mockImplementation(() => 'test12');

    let result = await ShortenerService.createAndSaveURL({ url: 'www.test.com' });
    expect(result).toEqual({ cutlifiedUrl: 'http://localhost:3000/test12' });
  });

  it('(extractTokenFromParams) Should throw unprocessable entity error', () => {
    try {
      ShortenerService.extractTokenFromParams({});
    } catch(e) {
      expect(e.message).toEqual('Please provide valid "Cutlified" url!');
    }
  });
  it('(extractTokenFromParams) Should return extracted token', () => {
    const token = ShortenerService.extractTokenFromParams({ 0: 'test12' });
    expect(token).toEqual('test12');
  })

  it('(getOriginalURL) Should throw error from "cacache"', async() => {
    try {
      jest.spyOn(cacache, 'get').mockImplementation(() => {
        throw new Error('Test error from "cacache"!')
      });
  
      await ShortenerService.getOriginalURL('test12');
    } catch(e) {
      expect(e.message).toEqual('Url with that key was not found!');
    }
  });
  it('(getOriginalURL) Should return the original url', async() => {
    jest.spyOn(cacache, 'get').mockImplementation(() => ({
      data: {
        toString: () => 'www.test.com'
      }
    }));

    jest.spyOn(ShortenerUtils, 'appendProtocolToUrlIfDoesntExist').mockImplementation(() => {
      return 'https://www.test.com';
    })

    let result = await ShortenerService.getOriginalURL('test12');
    expect(result).toEqual('https://www.test.com');
  });
});

describe('Shortener Utils', () => {
  it('(appendProtocolToUrlIfDoesntExist) Should return correct URL (1)', () => {
    let result = ShortenerUtils.appendProtocolToUrlIfDoesntExist('test.com');
    expect(result).toEqual('http://test.com');
  });
  it('(appendProtocolToUrlIfDoesntExist) Should return correct URL (2)', () => {
    let result = ShortenerUtils.appendProtocolToUrlIfDoesntExist('www.test.com');
    expect(result).toEqual('http://www.test.com');
  });
  it('(appendProtocolToUrlIfDoesntExist) Should return correct URL (3)', () => {
    let result = ShortenerUtils.appendProtocolToUrlIfDoesntExist('http://www.test.com');
    expect(result).toEqual('http://www.test.com');
  });
  it('(appendProtocolToUrlIfDoesntExist) Should return correct URL (4)', () => {
    let result = ShortenerUtils.appendProtocolToUrlIfDoesntExist('https://www.test.com');
    expect(result).toEqual('https://www.test.com');
  });

  it('(checkUrlCorrectness) Should throw an error related to incorrect URL (1)', () => {
    try {
      ShortenerUtils.checkUrlCorrectness('');
    } catch (e) {
      expect(e.message).toEqual('Please provide valid URL!');
    }
  });
  it('(checkUrlCorrectness) Should throw an error related to incorrect URL (2)', () => {
    try {
      ShortenerUtils.checkUrlCorrectness('test');
    } catch (e) {
      expect(e.message).toEqual('Please provide valid URL!');
    }
  });
  it('(checkUrlCorrectness) Should throw an error related to incorrect URL (3)', () => {
    try {
      ShortenerUtils.checkUrlCorrectness('test.a');
    } catch (e) {
      expect(e.message).toEqual('Please provide valid URL!');
    }
  });
  it('(checkUrlCorrectness) Should throw an error related to incorrect URL (4)', () => {
    try {
      ShortenerUtils.checkUrlCorrectness('www.test');
    } catch (e) {
      expect(e.message).toEqual('Please provide valid URL!');
    }
  });
  it('(checkUrlCorrectness) Should throw an error related to incorrect URL (5)', () => {
    try {
      ShortenerUtils.checkUrlCorrectness('http:/test.a');
    } catch (e) {
      expect(e.message).toEqual('Please provide valid URL!');
    }
  });
  it('(checkUrlCorrectness) Should throw an error related to incorrect URL (6)', () => {
    try {
      ShortenerUtils.checkUrlCorrectness('htt://test.com');
    } catch (e) {
      expect(e.message).toEqual('Please provide valid URL!');
    }
  });
  it('(checkUrlCorrectness) Should pass the check successfully (1)', () => {
    let result = ShortenerUtils.checkUrlCorrectness('http://test.com');
    expect(result).toBeTruthy();
  });
  it('(checkUrlCorrectness) Should pass the check successfully (2)', () => {
    let result = ShortenerUtils.checkUrlCorrectness('http://www.test.com');
    expect(result).toBeTruthy();
  });
  it('(checkUrlCorrectness) Should pass the check successfully (3)', () => {
    let result = ShortenerUtils.checkUrlCorrectness('www.test.com');
    expect(result).toBeTruthy();
  });
  it('(checkUrlCorrectness) Should pass the check successfully (4)', () => {
    let result = ShortenerUtils.checkUrlCorrectness('www.test.second.com');
    expect(result).toBeTruthy();
  });
});

