import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("⚠️ Please add MONGODB_URI in your .env.local file");
}

let isConnected = false; // track connection state

export const connectDB = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB || "gitrepos",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};
