const redis = require('redis');
const redisCache = require('express-redis-cache')();

const ApiError = require('@error');

const client = redis.createClient();

function deleteEndpointCashe(endpoint) {
  return redisCache.del(endpoint, (error) => {
    if (error) {
      throw new ApiError(error);
    }

  });
}

module.exports = {
  client,
  redisCache,

  deleteEndpointCashe
}
