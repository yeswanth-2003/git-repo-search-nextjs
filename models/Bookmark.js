import mongoose from "mongoose";

const BookmarkSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  repoId: { type: Number, required: true }, // GitHub repo id
  repo: { type: Object, required: true },
  savedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Bookmark || mongoose.model("Bookmark", BookmarkSchema);
