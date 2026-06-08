const { listPostsService, publishPostService } = require("./posts.service");

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

module.exports = {
  listPostsController,
  publishPostController,
};
