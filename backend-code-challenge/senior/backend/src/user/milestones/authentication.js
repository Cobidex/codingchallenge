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
  const encodedSlug = req.headers[X_SLUG];
  const decodedSlug = Buffer.from(encodedSlug, 'base64').toString('utf-8');

  if (decodedSlug !== MYSELF) return context(new BadRequestError());

  return context.continue;
};
