// app/api/profile/route.js
import { NextResponse } from "next/server";
import { fetchGitHubUser, fetchGitHubRepos } from "@/lib/github";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  if (!username) {
    return NextResponse.json({ error: "username required" }, { status: 400 });
  }

  try {
    // ✅ use helper
    const repos = await fetchGitHubRepos(username);

    // Language aggregation
    const languageCount = {};
    repos.forEach((r) => {
      const lang = r.language || "Other";
      languageCount[lang] = (languageCount[lang] || 0) + 1;
    });

    // Top projects by stars
    const topByStars = [...repos]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
      .map((r) => ({
        id: r.id,
        name: r.name,
        full_name: r.full_name,
        description: r.description,
        stars: r.stargazers_count,
        forks: r.forks_count,
        updated_at: r.updated_at,
        language: r.language,
        html_url: r.html_url,
      }));

    // Contribution-like metrics
    const totalStars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
    const totalForks = repos.reduce((s, r) => s + (r.forks_count || 0), 0);

    // Language pie data
    const languagePie = Object.entries(languageCount).map(([lang, count]) => ({
      name: lang,
      value: count,
    }));

    return NextResponse.json({
      username,
      repoCount: repos.length,
      totalStars,
      totalForks,
      languagePie,
      topByStars,
      repos: repos.map((r) => ({
        id: r.id,
        name: r.name,
        full_name: r.full_name,
        description: r.description,
        stars: r.stargazers_count,
        forks: r.forks_count,
        updated_at: r.updated_at,
        language: r.language,
        html_url: r.html_url,
      })),
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
