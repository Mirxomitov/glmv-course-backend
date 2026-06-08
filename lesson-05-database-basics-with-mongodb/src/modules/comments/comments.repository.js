const { comments, getNextCommentId } = require("../shared/db/db");
const Comment = require("./comment.model");

async function getCommentsByPostId(postId) {
  return comments
    .filter((c) => c.postId === postId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt) || b.id - a.id);
}

async function createComment({ postId, authorId, username, body }) {
  const comment = new Comment({
    id: getNextCommentId(),
    postId,
    authorId,
    username,
    body,
    createdAt: new Date().toISOString(),
  });

  comments.push(comment);
  return comment;
}

module.exports = {
  getCommentsByPostId,
  createComment,
};
