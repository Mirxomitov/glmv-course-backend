const { getAllPosts, publishPost } = require("./posts.repository");

async function listPostsService() {
  return await getAllPosts();
}

async function publishPostService(post) {
  return await publishPost(post);
}

module.exports = {
  listPostsService,
  publishPostService
};
