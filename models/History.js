import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  query: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.History || mongoose.model("History", HistorySchema);
