import { connectDB } from "@/lib/mongodb";
import Bookmark from "@/models/Bookmark";

// GET bookmarks
export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response(JSON.stringify({ error: "Missing userId" }), { status: 400 });
  }

  const bookmarks = await Bookmark.find({ userId }).sort({ savedAt: -1 });
  return new Response(JSON.stringify(bookmarks), { status: 200 });
}

// POST new bookmark
export async function POST(req) {
  await connectDB();
  const body = await req.json();

  const exists = await Bookmark.findOne({ userId: body.userId, repoId: body.repo.id });
  if (exists) {
    return new Response(JSON.stringify({ message: "Already bookmarked" }), { status: 200 });
  }

  const newBookmark = await Bookmark.create({
    userId: body.userId,
    repoId: body.repo.id,
    repo: body.repo,
  });

  return new Response(JSON.stringify(newBookmark), { status: 201 });
}

// DELETE a bookmark
export async function DELETE(req) {
  await connectDB();
  const body = await req.json();

  await Bookmark.deleteOne({ userId: body.userId, repoId: body.repoId });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
