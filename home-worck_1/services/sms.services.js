const { TWILIO_ACC_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE } = require('../config/config');

const client = require('twilio')(TWILIO_ACC_SID, TWILIO_AUTH_TOKEN);

module.exports = {
  sendSmS: async (phone, message) => {
    await client.messages
      .create({
        body: message,
        from: TWILIO_PHONE,
        to: phone
      })
  }
}
