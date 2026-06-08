const {
  getAllPosts,
  findPostById,
  publishPost,
  likePost,
  unlikePost,
  editPost,
} = require("./posts.repository");
const { findCategoriesByIds } = require("../categories/categories.repository");
const { HttpError } = require("../shared/errors/http-error");

async function listPostsService() {
  return await getAllPosts();
}

// Shared referential-integrity check: every id must resolve to a real category.
// Used by both create and edit so the rule lives in one place.
async function assertCategoriesExist(categoryIds) {
  if (categoryIds.length === 0) return;
  const found = await findCategoriesByIds(categoryIds);
  const foundIds = new Set(found.map((c) => c.id));
  const allExist = categoryIds.every((id) => foundIds.has(id));
  if (!allExist) {
    throw HttpError.badRequest("One or more categories do not exist");
  }
}

async function publishPostService(post) {
  const categoryIds = [...new Set(post.categoryIds || [])];
  await assertCategoriesExist(categoryIds);
  return await publishPost({ ...post, categoryIds });
}

async function editPostService(postId, userId, changes) {
  const post = await findPostById(postId);
  if (!post) throw HttpError.notFound("Post not found");
  if (!post.authorId.equals(userId)) {
    throw HttpError.forbidden("You can only edit your own post");
  }

  // Build the update from whitelisted fields only — never the raw body.
  const update = {};
  if (changes.title !== undefined) update.title = changes.title;
  if (changes.content !== undefined) update.content = changes.content;
  if (changes.categoryIds !== undefined) {
    const ids = [...new Set(changes.categoryIds)];
    await assertCategoriesExist(ids);
    update.categoryIds = ids;
  }

  // Nothing to change → return the post as-is (avoids a needless write).
  if (Object.keys(update).length === 0) return post;

  const updated = await editPost(postId, update);
  if (!updated) throw HttpError.notFound("Post not found");
  return updated;
}

function hasLiked(post, userId) {
  return post.likedBy.some((id) => id.equals(userId));
}

function likeSummary(post, userId) {
  return {
    postId: post.id,
    likeCount: post.likedBy.length,
    liked: hasLiked(post, userId),
  };
}

async function toggleLikeService(postId, userId) {
  const post = await findPostById(postId);
  if (!post) throw HttpError.notFound("Post not found");

  // Decide direction from the current state, then apply an atomic write.
  // The returned document reflects the post-update state (`new: true`).
  const updated = hasLiked(post, userId)
    ? await unlikePost(postId, userId)
    : await likePost(postId, userId);

  // The post may have been removed between the read and the write.
  if (!updated) throw HttpError.notFound("Post not found");

  return likeSummary(updated, userId);
}

module.exports = {
  listPostsService,
  publishPostService,
  toggleLikeService,
  editPostService,
};
