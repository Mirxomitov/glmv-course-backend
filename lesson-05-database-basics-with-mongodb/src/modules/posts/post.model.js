class Post {
  constructor({
    id,
    title,
    content,
    authorId,
    createdAt,
    likedBy = [],
  }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.authorId = authorId;
    this.createdAt = createdAt;
    this.likedBy = likedBy;
  }
}

module.exports = Post;