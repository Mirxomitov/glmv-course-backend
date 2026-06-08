const mongoose = require("mongoose");
const { toJSONConfig } = require("../shared/db/to-json");

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    permissionIds: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Permission" },
    ],
  },
  { timestamps: true }
);

roleSchema.set("toJSON", toJSONConfig());

module.exports = mongoose.model("Role", roleSchema);
