'use strict';

const axios = require('axios');

const {
  STAR_WARS_API: {
    BASE_URL,
    ENDPOINTS: { PEOPLE },
  },
} = require('../../config');

module.exports = async (req, res, context) => {
  const { favourites } = req.body;
  const asyncFns = favourites.map((id) => {
    const uri = `${BASE_URL}/${PEOPLE}/${id}/`;
    return axios.get(uri);
  });

  const favItems = await Promise.all(asyncFns);
  res.favouritesDetails = favItems;

  return context.continue;
};
