import mongoose from "mongoose";
const mongooseIntl = require("mongoose-intl");

mongoose.set("debug", true);
mongoose.plugin(mongooseIntl, { languages: ["en", "hi"], defaultLanguage: "en" });

const databaseLoader = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("❌ MONGO_URI not found in .env");
  }

  console.log("Connecting to the database...", process.env.MONGO_URI);

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Database connection established");
    return db;
  } catch (err) {
    console.error("❌ Database connection error:", err);
    throw err;
  }
};

export { databaseLoader };