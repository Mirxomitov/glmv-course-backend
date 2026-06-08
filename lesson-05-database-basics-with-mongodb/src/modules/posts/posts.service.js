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

function likeSummary(post, userId) {
  return {
    postId: post.id,
    likeCount: post.likedBy.length,
    liked: post.likedBy.includes(userId),
  };
}

async function toggleLikeService(postId, userId) {
  const post = await findPostById(postId);
  if (!post) throw HttpError.notFound("Post not found");

  if (post.likedBy.includes(userId)) {
    await unlikePost(post, userId);
  } else {
    await likePost(post, userId);
  }

  return likeSummary(post, userId);
}

module.exports = {
  listPostsService,
  publishPostService,
  toggleLikeService,
};
