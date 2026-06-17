const mongoose = require("mongoose");
const { toJSONConfig } = require("../shared/db/to-json");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    // The price the user paid, stored at purchase time.
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

orderSchema.set("toJSON", toJSONConfig());

module.exports = mongoose.model("Order", orderSchema);
