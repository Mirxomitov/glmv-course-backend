const mongoose = require("mongoose");
const { toJSONConfig } = require("../shared/db/to-json");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    tokenVersion: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Never leak the password hash through JSON responses.
userSchema.set("toJSON", toJSONConfig("passwordHash"));

module.exports = mongoose.model("User", userSchema);
