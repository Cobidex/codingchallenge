'use strict';

const {
  Errors: { ForbiddenError },
} = require('finale-rest');

const {
  API: {
    KEY,
    HEADERS: { X_API_KEY },
  },
} = require('../../config');

module.exports = (req, res, context) => {
  const apiKey = req.headers[X_API_KEY];
  if (apiKey !== KEY) return context(new ForbiddenError());
  return context.continue;
};
