import mongoose from "mongoose";
import path from "path";

mongoose.set("strictQuery", false);

const databaseUrl =
  process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/project-duo";

export default mongoose.connect(databaseUrl);
