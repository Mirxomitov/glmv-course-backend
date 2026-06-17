const mongoose = require("mongoose");
const { toJSONConfig } = require("../shared/db/to-json");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    // How much money the user has to spend on courses.
    balance: { type: Number, required: true, default: 0, min: 0 },
  },
  { timestamps: true }
);

userSchema.set("toJSON", toJSONConfig());

module.exports = mongoose.model("User", userSchema);
