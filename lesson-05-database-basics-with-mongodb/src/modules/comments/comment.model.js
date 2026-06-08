class Comment {
  constructor({
    id,
    postId,
    authorId,
    username,
    body,
    createdAt,
  }) {
    this.id = id;
    this.postId = postId;
    this.authorId = authorId;
    this.username = username;
    this.body = body;
    this.createdAt = createdAt;
  }
}

module.exports = Comment;
