module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'local',

  PORT: process.env.PORT || 5000,
  MONGO_DB_URL: process.env.MONGO_DB_URL || 'mongodb://localhost:27017/hebron_homeworck',

  ACCESS_TOKEN: process.env.ACCESS_TOKEN || 'TOKEN_SECRET',
  REFRESH_TOKEN: process.env.REFRESH_TOKEN || 'REFRESH_SECRET',
  ACTION_TOKEN: process.env.ACTION_TOKEN || 'ACTION_SECRET',

  SYSTEM_MAIL: process.env.SYSTEM_MAIL || '',
  SYSTEM_MAIL_PASSWORD: process.env.SYSTEM_MAIL_PASSWORD || '',

  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',

  S3_BUCKET: process.env.S3_BUCKET,
  S3_REGION: process.env.S3_REGION,
  S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
  S3_SECRET_KEY: process.env.S3_SECRET_KEY
}
