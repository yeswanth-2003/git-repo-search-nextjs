import { connectDB } from "@/lib/mongodb";
import History from "@/models/History";

// GET history (only for logged-in users)
export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response(JSON.stringify([]), { status: 200 }); // return empty if guest
  }

  const history = await History.find({ userId }).sort({ timestamp: -1 }).limit(20);
  return new Response(JSON.stringify(history), { status: 200 });
}

// POST new history
export async function POST(req) {
  await connectDB();
  const body = await req.json();

  if (!body.userId) {
    // 👇 Guest users can search without saving
    return new Response(JSON.stringify({ message: "Guest search, not saved" }), { status: 200 });
  }

  const newHistory = await History.create({
    userId: body.userId,
    query: body.query,
  });

  return new Response(JSON.stringify(newHistory), { status: 201 });
}
