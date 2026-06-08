const { posts, getNextPostId } = require("../shared/db/db");
const Post = require("./post.model");

async function getAllPosts(authorId) {
  return posts.filter((p) => p.authorId === authorId);
}

async function publishPost({ title, content, authorId }) {
  const post = new Post({
    id: getNextPostId(),
    title,
    content,
    authorId,
    createdAt: new Date().toISOString(),
  });

  posts.push(post);
  return post;
}

module.exports = {
  getAllPosts,
  publishPost,
};
