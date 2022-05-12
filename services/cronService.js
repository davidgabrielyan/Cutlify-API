import { CronJob } from 'cron';
import cacache from 'cacache';

const job = new CronJob(
  '* */1 * * *',
  (async () => {
    const currentTimestamp = +new Date();
    const entities = await cacache.ls(process.env.CACHE_PATH);
    Object.keys(entities).forEach((key) => {
      const difference = Math.floor((currentTimestamp - entities[key].time) / 1000 / 60 / 60);
      if (difference >= process.env.TTL) {
        cacache.rm.content(process.env.CACHE_PATH, entities[key].integrity);
      }
    });
  }),
);

export default job;
