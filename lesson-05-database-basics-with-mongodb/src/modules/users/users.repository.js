const User = require("./users.model");
const Post = require("../posts/post.model");

async function findUserByEmail(email) {
  return User.findOne({ email });
}

async function findUserById(id) {
  return User.findById(id);
}

async function findUserByUsername(username) {
  return User.findOne({ username });
}

async function createUser({ email, username, passwordHash, roleId }) {
  return User.create({
    email,
    username,
    passwordHash,
    roleId,
    tokenVersion: 0,
  });
}

async function getUserPosts(userId) {
  return Post.find({ authorId: userId })
    .sort({ createdAt: -1 })
    .populate("author", "username");
}

async function incrementTokenVersion(userId) {
  return User.findByIdAndUpdate(
    userId,
    { $inc: { tokenVersion: 1 } },
    { new: true }
  );
}

module.exports = {
  findUserByEmail,
  findUserById,
  findUserByUsername,
  createUser,
  getUserPosts,
  incrementTokenVersion,
};
