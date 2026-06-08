class Post {
  constructor({
    id,
    title,
    content,
    authorId,
    createdAt,
    likedBy = [],
    categoryIds = [],
  }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.authorId = authorId;
    this.createdAt = createdAt;
    this.likedBy = likedBy;
    this.categoryIds = categoryIds;
  }
}

module.exports = Post;