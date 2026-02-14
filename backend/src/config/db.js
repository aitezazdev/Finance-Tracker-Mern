import mongoose from "mongoose";
import { DB_NAME } from "../../constant.js";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const dbConnection = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error("MongoDB connection FAILED:", error);
    process.exit(1);
  }

  console.log(`MongoDB connected!! Host: ${cached.conn.connection.host}`);
  return cached.conn;
};