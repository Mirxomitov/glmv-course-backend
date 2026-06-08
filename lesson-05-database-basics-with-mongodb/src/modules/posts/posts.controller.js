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

async function publishPostController(req, res, next) {
  try {
    const { title, content, categoryIds } = req.body;

    if (
      typeof title !== "string" ||
      typeof content !== "string"
    ) {
      throw HttpError.badRequest("Invalid post data");
    }

    if (
      categoryIds !== undefined &&
      (!Array.isArray(categoryIds) ||
        !categoryIds.every((id) => Number.isInteger(id)))
    ) {
      throw HttpError.badRequest("categoryIds must be an array of integers");
    }

    const post = await publishPostService({
      title,
      content,
      authorId: req.user.sub,
      categoryIds: categoryIds || [],
    });

    return res.status(201).json({
      message: "ok",
      data: post,
    });
  } catch (error) {
    return next(error);
  }
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
