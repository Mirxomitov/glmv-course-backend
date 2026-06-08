const Post = require("./post.model");

// Author fields we expose when joining the User doc onto a post.
const AUTHOR_FIELDS = "username";

async function getAllPosts() {
  return Post.find().sort({ createdAt: -1 }).populate("author", AUTHOR_FIELDS);
}

// No populate here on purpose: this is the internal lookup used for ownership
// checks (post.authorId.equals(userId)), which needs authorId to stay an ObjectId.
async function findPostById(id) {
  return Post.findById(id);
}

// Atomic, race-safe like: $addToSet adds the user only if absent (no manual
// dedup needed). Returns the updated document, or null if the post is gone.
async function likePost(postId, userId) {
  return Post.findByIdAndUpdate(
    postId,
    { $addToSet: { likedBy: userId } },
    { new: true }
  );
}

// Atomic, race-safe unlike: $pull removes the user in a single server-side op.
async function unlikePost(postId, userId) {
  return Post.findByIdAndUpdate(
    postId,
    { $pull: { likedBy: userId } },
    { new: true }
  );
}

async function publishPost({ title, content, authorId, categoryIds }) {
  const post = await Post.create({
    title,
    content,
    authorId,
    categoryIds,
  });
  // Return the created post with its author joined, to match the read shape.
  return post.populate("author", AUTHOR_FIELDS);
}

// Applies a whitelisted set of changes. Returns the updated document, or null
// if the post no longer exists. `runValidators` keeps schema rules enforced.
async function editPost(postId, update) {
  return Post.findByIdAndUpdate(
    postId,
    { $set: update },
    { new: true, runValidators: true }
  ).populate("author", AUTHOR_FIELDS);
}

module.exports = {
  getAllPosts,
  findPostById,
  publishPost,
  likePost,
  unlikePost,
  editPost,
};
