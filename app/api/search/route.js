import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("q") || "react";
  const language = searchParams.get("language") || "";
  const stars = searchParams.get("stars") || "";
  const updated = searchParams.get("updated") || "";
  const sort = searchParams.get("sort") || "stars";

  let q = query;
  if (language) q += ` language:${language}`;
  if (stars) q += ` stars:${stars}`;
  if (updated) {
    const since = new Date();
    since.setDate(since.getDate() - parseInt(updated));
    q += ` pushed:>${since.toISOString().split("T")[0]}`;
  }

  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&sort=${sort}&order=desc&per_page=15`;

  const res = await fetch(url, {
    headers: { "User-Agent": "NextJS-App" },
    next: { revalidate: 60 }, // cache for 1 min
  });

  const data = await res.json();

  const repos = data.items?.map((repo) => ({
    id: repo.id,
    name: repo.full_name,
    description: repo.description,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updated: repo.updated_at,
  })) || [];

  return NextResponse.json(repos);
}
