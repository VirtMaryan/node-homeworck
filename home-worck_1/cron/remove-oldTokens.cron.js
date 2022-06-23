const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const { modelOAuth } = require('../dataBase');

dayJs.extend(utc);

module.exports = async () => {
  const tenMinyteBefor = dayJs().utc().subtract(15, 'minute');
  const result = await modelOAuth.deleteMany({ createdAt: { $lte: tenMinyteBefor } });

  console.log(result);
};
