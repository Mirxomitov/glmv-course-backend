const { posts, getNextPostId } = require("../shared/db/db");
const Post = require("./post.model");

async function getAllPosts(authorId) {
  return posts.filter((p) => p.authorId === authorId);
}

async function findPostById(id) {
  return posts.find((p) => p.id === id) || null;
}

async function likePost(post, userId) {
  if (!post.likedBy.includes(userId)) {
    post.likedBy.push(userId);
  }
  return post;
}

async function unlikePost(post, userId) {
  post.likedBy = post.likedBy.filter((id) => id !== userId);
  return post;
}

async function publishPost({ title, content, authorId, categoryIds }) {
  const post = new Post({
    id: getNextPostId(),
    title,
    content,
    authorId,
    createdAt: new Date().toISOString(),
    categoryIds,
  });

  posts.push(post);
  return post;
}

module.exports = {
  getAllPosts,
  findPostById,
  publishPost,
  likePost,
  unlikePost,
};
