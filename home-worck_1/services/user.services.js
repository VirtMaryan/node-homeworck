const { modelUser } = require('../dataBase');
const { ApiError } = require('@error');

module.exports = {
  getUserWithcount: async (query = {}) => {
    const { limit = 20, page = 1, ...otherFilters } = query;

    if (limit <= 0 || page <= 0) {
      throw new ApiError('Limit or page not valid', 400);
    }

    const skip = (page - 1) * limit;

    let filterObject = {};

    if (otherFilters.search) {
      filterObject = {
        ...filterObject,
        $or: [
          { name: { $regex: otherFilters.search, $options: 'i' } },
          { email: { $regex: otherFilters.search, $options: 'i' } },
          { gender: { $regex: otherFilters.search, $options: 'i' } }
        ]
      }
    }

    if (otherFilters.age_gte) {
      filterObject = {
        ...filterObject,
        age: { $gte: +otherFilters.age_gte }
      }
    }

    if (otherFilters.age_lte) {
      filterObject = {
        ...filterObject,
        age: Object.assign(filterObject.age || {}, { $lte: +otherFilters.age_lte })
      }
    }

    const users = await modelUser.find(filterObject).limit(limit).skip(skip);
    const count = await modelUser.count(filterObject);

    return {
      perPage: limit,
      page,
      count,
      data: users
    }
  }
}
