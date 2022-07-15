const { smsActionsEnum } = require('../constants');

module.exports = {
  [smsActionsEnum.WELOCME]: (name) => `${name} welcome to twilio services`
  

}
