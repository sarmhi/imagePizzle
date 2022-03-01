const job = require('../service/cron');

exports.startJob = (req, res, next) => {
    job.start();
    next();
}