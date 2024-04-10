'use strict';

const axios = require('axios');

const {
  STAR_WARS_API: {
    BASE_URL,
    ENDPOINTS: { PEOPLE },
  },
} = require('../../config');

module.exports = async (req, res, context) => {
  const { favourites } = context.instance.dataValues;
  const asyncFns = favourites.map((id) => {
    const uri = `${BASE_URL}/${PEOPLE}/${id}`;
    const response = axios.get(uri);
    return response;
  });

  const favItems = await Promise.all(asyncFns);

  context.instance.dataValues.favouritesDetails = favItems.map((item) => item.data);

  return context.continue;
};
