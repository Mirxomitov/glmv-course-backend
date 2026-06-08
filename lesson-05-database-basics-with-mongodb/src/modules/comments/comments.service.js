const { getCommentsByPostId, createComment } = require("./comments.repository");
const { findPostById } = require("../posts/posts.repository");
const { HttpError } = require("../shared/errors/http-error");

async function listCommentsService(postId) {
  const post = await findPostById(postId);
  if (!post) throw HttpError.notFound("Post not found");

  return await getCommentsByPostId(postId);
}

async function addCommentService({ postId, authorId, username, body }) {
  const post = await findPostById(postId);
  if (!post) throw HttpError.notFound("Post not found");

  return await createComment({ postId, authorId, username, body });
}

module.exports = {
  listCommentsService,
  addCommentService,
};
