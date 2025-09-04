import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  githubId: { type: String, required: true, unique: true },
  name: String,
  email: String,
  image: String,
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
