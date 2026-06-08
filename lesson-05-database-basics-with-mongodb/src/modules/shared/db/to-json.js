// Shared Mongoose toJSON config: expose `id`, drop `_id` and `__v`.
// Pass extra field names to strip them from the serialized output (e.g. passwordHash).
function toJSONConfig(...hiddenFields) {
  return {
    virtuals: true,
    versionKey: false,
    transform(_doc, ret) {
      delete ret._id;
      for (const field of hiddenFields) {
        delete ret[field];
      }
      return ret;
    },
  };
}

module.exports = { toJSONConfig };
