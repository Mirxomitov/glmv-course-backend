class Post {
  constructor({
    id,
    title,
    content,
    authorId,
    createdAt,
  }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.authorId = authorId;
    this.createdAt = createdAt;
  }
}

module.exports = Post;