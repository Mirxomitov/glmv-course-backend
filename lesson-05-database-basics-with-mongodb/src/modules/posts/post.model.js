const mongoose = require("mongoose");
const { toJSONConfig } = require("../shared/db/to-json");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    categoryIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  },
  { timestamps: true }
);

// Read-only join: `authorId` stays the stored ObjectId; `author` is populated on
// demand (.populate("author")) into the matching User. Nothing extra is stored.
postSchema.virtual("author", {
  ref: "User",
  localField: "authorId",
  foreignField: "_id",
  justOne: true,
});

// Hide the raw `authorId` from responses — clients use the populated `author`
// object instead. The field is still stored in Mongo and used internally.
postSchema.set("toJSON", toJSONConfig("authorId"));

module.exports = mongoose.model("Post", postSchema);
