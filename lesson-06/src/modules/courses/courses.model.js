const mongoose = require("mongoose");
const { toJSONConfig } = require("../shared/db/to-json");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    // How many seats are still available for purchase.
    seatsLeft: { type: Number, required: true, default: 0, min: 0 },
  },
  { timestamps: true }
);

courseSchema.set("toJSON", toJSONConfig());

module.exports = mongoose.model("Course", courseSchema);
