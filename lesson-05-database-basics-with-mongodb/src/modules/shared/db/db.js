const mongoose = require("mongoose");

const DEFAULT_URI = "mongodb://127.0.0.1:27017/glmv_course";

async function connectDB() {
  const uri = process.env.MONGODB_URI || DEFAULT_URI;

  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
  });
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err.message);
  });

  await mongoose.connect(uri);
  return mongoose.connection;
}

module.exports = { connectDB };
