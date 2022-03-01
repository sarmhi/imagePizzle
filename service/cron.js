const fs = require('fs-extra');
const path = require('path');

const CronJob = require('cron').CronJob;

const folderDir = path.join(__dirname, '..', 'images');

const job = new CronJob('0 0 0 * * *', async function() {
  try {
    const folder = await fs.emptyDir(folderDir);
    return folder;
    
  } catch (err) {
    const error = new Error('Could not run cron job');
    return error;
  }
}, null, true);

module.exports = job;