import UrlData from '../models/UrlSchema';

export default class UrlRepository {
  static create(data) {
    return UrlData.create({ ...data });
  }

  static getOne(filter) {
    return UrlData.findOne({ where: { ...filter } });
  }
}
