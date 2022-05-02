const Joi = require('joi');

const ExportsNotePayloadSchema = Joi.object({
  targetEmail: Joi.string().email({ tlds: true }).required(),
});

module.exports = ExportsNotePayloadSchema;
