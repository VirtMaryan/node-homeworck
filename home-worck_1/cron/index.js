const cron = require('node-cron');

const removeOldTokens = require('./remove-oldTokens.cron');

module.exports = () => {
  cron.schedule('*/10 * * * * *', removeOldTokens );
};
