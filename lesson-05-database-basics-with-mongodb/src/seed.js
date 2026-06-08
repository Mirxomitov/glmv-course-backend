// require("dotenv").config();

// const mongoose = require("mongoose");
// const { connectDB } = require("./modules/shared/db/db");
// const { seedDatabase } = require("./modules/shared/db/seed");

// // Standalone seeding entry point. Run once after setting up / resetting the DB:
// //   npm run seed
// async function run() {
//   await connectDB();
//   await seedDatabase();
//   await mongoose.disconnect();
// }

// run()
//   .then(() => {
//     console.log("Seeding finished");
//     process.exit(0);
//   })
//   .catch((err) => {
//     console.error("Seeding failed:", err);
//     process.exit(1);
//   });
