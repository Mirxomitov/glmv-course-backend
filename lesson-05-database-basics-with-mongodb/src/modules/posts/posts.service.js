const {
  getAllPosts,
  findPostById,
  publishPost,
  likePost,
  unlikePost,
} = require("./posts.repository");
const { findCategoriesByIds } = require("../categories/categories.repository");
const { HttpError } = require("../shared/errors/http-error");

async function listPostsService() {
  return await getAllPosts();
}

async function publishPostService(post) {
  const categoryIds = [...new Set(post.categoryIds || [])];

  if (categoryIds.length > 0) {
    const found = await findCategoriesByIds(categoryIds);
    const foundIds = new Set(found.map((c) => c.id));
    const allExist = categoryIds.every((id) => foundIds.has(id));
    if (!allExist) {
      throw HttpError.badRequest("One or more categories do not exist");
    }
  }

  return await publishPost({ ...post, categoryIds });
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
};
