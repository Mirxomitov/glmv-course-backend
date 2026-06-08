const mongoose = require("mongoose");
const { toJSONConfig } = require("../shared/db/to-json");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

categorySchema.set("toJSON", toJSONConfig());

module.exports = mongoose.model("Category", categorySchema);
