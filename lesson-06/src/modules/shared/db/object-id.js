const mongoose = require("mongoose");
const { HttpError } = require("../errors/http-error");

// Validate an incoming route param / id string before it hits the database.
// Throws a 400 instead of letting Mongoose raise a CastError (which would 500).
function parseObjectId(value, label = "id") {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw HttpError.badRequest(`Invalid ${label}`);
  }
  return value;
}

function isValidObjectId(value) {
  return mongoose.Types.ObjectId.isValid(value);
}

module.exports = { parseObjectId, isValidObjectId };
