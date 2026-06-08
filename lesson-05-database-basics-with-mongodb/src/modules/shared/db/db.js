const permissions = [
  { id: 1, code: "users.read" },
  { id: 2, code: "users.write" },
  { id: 3, code: "roles.manage" },
  { id: 4, code: "roles.read" },
  { id: 5, code: "permissions.read" },
  { id: 6, code: "posts.read" },
  { id: 7, code: "posts.write" },
  { id: 8, code: "comments.read" },
  { id: 9, code: "comments.write" },
  { id: 10, code: "categories.read" },
];

const roles = [
  { id: 1, name: "admin", permissionIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { id: 2, name: "user", permissionIds: [1, 6, 7, 8, 9, 10] },
];

const categories = [
  { id: 1, name: "Tech", slug: "tech" },
  { id: 2, name: "Sports", slug: "sports" },
  { id: 3, name: "News", slug: "news" },
  { id: 4, name: "Lifestyle", slug: "lifestyle" },
];

const users = [];

const posts = [];

const comments = [];

let nextUserId = 1; // what is this?
let nextPostId = 1;
let nextCommentId = 1;

module.exports = {
  permissions,
  roles,
  categories,
  users,
  posts,
  comments,
  getNextUserId: () => nextUserId++,
  getNextPostId: () => nextPostId++,
  getNextCommentId: () => nextCommentId++,
};
