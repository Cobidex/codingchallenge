'use strict';

const {
  Errors: { BadRequestError },
} = require('finale-rest');

const {
  API: {
    HEADERS: { X_SLUG },
    SLUGS: { MYSELF },
  },
} = require('../../config');

module.exports = (req, res, context) => {
  const slug = req.headers[X_SLUG];
  if (slug !== MYSELF) return context(new BadRequestError());
  return context.continue;
};
