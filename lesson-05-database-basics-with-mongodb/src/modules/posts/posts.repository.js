const Post = require("./post.model");

async function getAllPosts() {
  return Post.find().sort({ createdAt: -1 });
}

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
  return Post.create({
    title,
    content,
    authorId,
    categoryIds,
  });
}

module.exports = {
  getAllPosts,
  findPostById,
  publishPost,
  likePost,
  unlikePost,
};
