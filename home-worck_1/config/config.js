module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_DB_URL: process.env.MONGO_DB_URL || 'mongodb://localhost:27017/hebron_homeworck',

  ACCESS_TOKEN: 'TOKEN_SECRET',
  REFRESH_TOKEN: 'REFRESH_SECRET'
}
