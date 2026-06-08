const mongoose = require("mongoose");
const { toJSONConfig } = require("../shared/db/to-json");

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

commentSchema.set("toJSON", toJSONConfig());

module.exports = mongoose.model("Comment", commentSchema);
