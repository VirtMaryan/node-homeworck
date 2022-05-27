module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_DB_URL: process.env.MONGO_DB_URL || 'mongodb://localhost:27017/hebron_homeworck',

  ACCESS_TOKEN: 'TOKEN_SECRET',
  REFRESH_TOKEN: 'REFRESH_SECRET',
  ACTION_TOKEN: 'ACTION_SECRET',

  SYSTEM_MAIL: process.env.SYSTEM_MAIL || '',
  SYSTEM_MAIL_PASSWORD: process.env.SYSTEM_MAIL_PASSWORD || '',

  FRONTEND_URL: 'http://localhost:3000'
}
