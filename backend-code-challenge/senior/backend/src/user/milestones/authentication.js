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
  if (req.params.slug !== MYSELF) return context.continue;

  if (req.params.slug === MYSELF) req.params.slug = 'senior-candidate';

  const encodedSlug = req.header(X_SLUG);

  if (!encodedSlug) throw new BadRequestError('Missing user slug');

  if (Buffer.from(encodedSlug, 'base64').toString('utf-8')) return context.continue;
};
