/* eslint-disable no-underscore-dangle */
import { CronJob } from 'cron';
import UrlData from '../models/UrlSchema';

const job = new CronJob(
  '* */1 * * *',
  (async () => {
    const currentTimestamp = +new Date();
    const entities = await UrlData.find();
    const deletableEntityIds = [];
    entities.forEach((entity) => {
      const difference = Math.floor((currentTimestamp - (+entity.createdAt)) / 1000 / 60 / 60);
      if (difference >= process.env.TTL) {
        deletableEntityIds.push(entity._id);
      }
    });
    UrlData.deleteMany({ _id: { $in: deletableEntityIds } }).exec();
  }),
);

export default job;
