class User {
  constructor({
    id,
    email,
    username,
    passwordHash,
    roleId,
    tokenVersion,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.passwordHash = passwordHash;
    this.roleId = roleId;
    this.tokenVersion = tokenVersion;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = User;
