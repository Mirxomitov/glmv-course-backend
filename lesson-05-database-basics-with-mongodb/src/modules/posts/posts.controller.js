const {
  listPostsService,
  publishPostService,
  toggleLikeService,
} = require("./posts.service");
const { HttpError } = require("../shared/errors/http-error");

function parsePostId(req) {
  const postId = Number(req.params.postId);
  if (!Number.isInteger(postId)) throw HttpError.badRequest("Invalid post id");
  return postId;
}

async function listPostsController(req, res) {
  const posts = await listPostsService(req.user.sub);
  return res.status(200).json({ message: "ok", data: posts });
}

async function publishPostController(req, res) {
  const { title, content } = req.body;

  if (
    typeof title !== "string" ||
    typeof content !== "string"
  ) {
    return res.status(400).json({
      message: "Invalid post data",
    });
  }

  const post = await publishPostService({
    title,
    content,
    authorId: req.user.sub,
  });

  return res.status(200).json({
    message: "ok",
    data: post,
  });
}

async function toggleLikeController(req, res, next) {
  try {
    const postId = parsePostId(req);
    const summary = await toggleLikeService(postId, req.user.sub);
    return res.status(200).json({ message: "ok", data: summary });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listPostsController,
  publishPostController,
  toggleLikeController,
};
