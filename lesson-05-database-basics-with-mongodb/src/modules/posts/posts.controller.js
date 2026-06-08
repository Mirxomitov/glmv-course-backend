const {
  listPostsService,
  publishPostService,
  toggleLikeService,
  editPostService,
} = require("./posts.service");
const { HttpError } = require("../shared/errors/http-error");
const { parseObjectId, isValidObjectId } = require("../shared/db/object-id");

function parsePostId(req) {
  return parseObjectId(req.params.postId, "post id");
}

// Transport-level shape check for categoryIds (well-formed ids only).
// Whether they *exist* is a business rule handled in the service.
function assertCategoryIdsShape(categoryIds) {
  if (categoryIds === undefined) return;
  if (
    !Array.isArray(categoryIds) ||
    !categoryIds.every((id) => isValidObjectId(id))
  ) {
    throw HttpError.badRequest("categoryIds must be an array of valid ids");
  }
}

async function listPostsController(req, res, next) {
  try {
    const posts = await listPostsService();
    return res.status(200).json({ message: "ok", data: posts });
  } catch (error) {
    return next(error);
  }
}

async function publishPostController(req, res, next) {
  try {
    const { title, content, categoryIds } = req.body;

    // Create requires both fields.
    if (typeof title !== "string" || typeof content !== "string") {
      throw HttpError.badRequest("Invalid post data");
    }
    assertCategoryIdsShape(categoryIds);

    const post = await publishPostService({
      title,
      content,
      authorId: req.user.sub,
      categoryIds: categoryIds || [],
    });

    return res.status(201).json({ message: "ok", data: post });
  } catch (error) {
    return next(error);
  }
}

async function editPostController(req, res, next) {
  try {
    const postId = parsePostId(req);
    const { title, content, categoryIds } = req.body;

    // PATCH is partial: each field is optional, but must be the right type
    // when present.
    if (title !== undefined && typeof title !== "string") {
      throw HttpError.badRequest("title must be a string");
    }
    if (content !== undefined && typeof content !== "string") {
      throw HttpError.badRequest("content must be a string");
    }
    assertCategoryIdsShape(categoryIds);

    const post = await editPostService(postId, req.user.sub, {
      title,
      content,
      categoryIds,
    });

    return res.status(200).json({ message: "ok", data: post });
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
  editPostController,
};
