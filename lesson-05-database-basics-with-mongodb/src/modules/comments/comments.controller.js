const { listCommentsService, addCommentService } = require("./comments.service");
const { HttpError } = require("../shared/errors/http-error");
const { parseObjectId } = require("../shared/db/object-id");

function parsePostId(req) {
  return parseObjectId(req.params.postId, "post id");
}

async function listCommentsController(req, res, next) {
  try {
    const postId = parsePostId(req);
    const comments = await listCommentsService(postId);
    return res.status(200).json({ message: "ok", data: comments });
  } catch (error) {
    return next(error);
  }
}

async function addCommentController(req, res, next) {
  try {
    const postId = parsePostId(req);
    const { body } = req.body;

    if (typeof body !== "string" || body.trim() === "") {
      throw HttpError.badRequest("Comment body is required");
    }

    const comment = await addCommentService({
      postId,
      authorId: req.user.sub,
      username: req.user.username,
      body,
    });

    return res.status(201).json({ message: "ok", data: comment });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listCommentsController,
  addCommentController,
};
