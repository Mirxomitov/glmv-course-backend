const {
  getAllPosts,
  findPostById,
  publishPost,
  likePost,
  unlikePost,
} = require("./posts.repository");
const { HttpError } = require("../shared/errors/http-error");

async function listPostsService() {
  return await getAllPosts();
}

async function publishPostService(post) {
  return await publishPost(post);
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
