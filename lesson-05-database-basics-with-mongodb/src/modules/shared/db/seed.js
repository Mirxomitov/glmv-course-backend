const Permission = require("../../permissions/permission.model");
const Role = require("../../roles/role.model");
const Category = require("../../categories/category.model");

const PERMISSION_CODES = [
  "users.read",
  "users.write",
  "roles.manage",
  "roles.read",
  "permissions.read",
  "posts.read",
  "posts.write",
  "comments.read",
  "comments.write",
  "categories.read",
];

const ROLE_DEFS = [
  { name: "admin", permissions: "all" },
  {
    name: "user",
    permissions: [
      "users.read",
      "posts.read",
      "posts.write",
      "comments.read",
      "comments.write",
      "categories.read",
    ],
  },
];

const CATEGORY_DEFS = [
  { name: "Tech", slug: "tech" },
  { name: "Sports", slug: "sports" },
  { name: "News", slug: "news" },
  { name: "Lifestyle", slug: "lifestyle" },
];

// Idempotent seeding: safe to run on every startup.
async function seedDatabase() {
  for (const code of PERMISSION_CODES) {
    await Permission.updateOne(
      { code },
      { $setOnInsert: { code } },
      { upsert: true }
    );
  }

  const permissions = await Permission.find();
  const codeToId = new Map(permissions.map((p) => [p.code, p._id]));

  for (const def of ROLE_DEFS) {
    const codes =
      def.permissions === "all" ? PERMISSION_CODES : def.permissions;
    const permissionIds = codes
      .map((code) => codeToId.get(code))
      .filter(Boolean);

    await Role.updateOne(
      { name: def.name },
      { $set: { permissionIds }, $setOnInsert: { name: def.name } },
      { upsert: true }
    );
  }

  for (const def of CATEGORY_DEFS) {
    await Category.updateOne(
      { slug: def.slug },
      { $setOnInsert: def },
      { upsert: true }
    );
  }

  console.log("Database seeded (permissions, roles, categories)");
}

module.exports = { seedDatabase };
