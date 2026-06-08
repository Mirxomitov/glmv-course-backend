const Comment = require("./comment.model");

async function getCommentsByPostId(postId) {
  return Comment.find({ postId }).sort({ createdAt: -1 });
}

async function createComment({ postId, authorId, username, body }) {
  return Comment.create({
    postId,
    authorId,
    username,
    body,
  });
}

module.exports = {
  getCommentsByPostId,
  createComment,
};
