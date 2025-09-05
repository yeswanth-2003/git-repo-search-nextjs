"use client";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // track current page
  const [totalCount, setTotalCount] = useState(0);

  const perPage = 15; // results per page

  const handleSearch = async (newPage = 1) => {
    if (!query) return;
    setLoading(true);
    setResults([]);
    setPage(newPage);

    try {
      const res = await fetch(
        `https://api.github.com/search/repositories?q=${query}&page=${newPage}&per_page=${perPage}`
      );
      const data = await res.json();
      setResults(data.items || []);
      setTotalCount(data.total_count || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">🔍 GitHub Repo Search</h1>

      {/* Search Bar */}
      <div className="flex gap-2 mb-10 w-full max-w-xl">
        <input
          type="text"
          placeholder="Search repositories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch(1)}
          className="flex-1 rounded-2xl px-4 py-3 bg-white/10 border border-white/20 backdrop-blur-md text-white placeholder-gray-300 outline-none"
        />
        <button
          onClick={() => handleSearch(1)}
          className="rounded-2xl px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold hover:scale-105 transition-transform"
        >
          Search
        </button>
      </div>

      {/* Results */}
      <div className="grid gap-6 w-full max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {loading && <p className="text-gray-400">Loading...</p>}
        {!loading &&
          results.map((repo) => (
            <div
              key={repo.id}
              className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-lg hover:scale-[1.02] transition-transform"
            >
              <h2 className="text-lg font-semibold text-blue-400 mb-2">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.full_name}
                </a>
              </h2>
              <p className="text-gray-300 text-sm mb-3">
                {repo.description || "No description available."}
              </p>
              <div className="flex gap-4 text-sm text-gray-400">
                <span>⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
                <span>💻 {repo.language || "N/A"}</span>
              </div>
            </div>
          ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center gap-4 mt-10">
          <button
            onClick={() => handleSearch(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 backdrop-blur-md text-white disabled:opacity-40"
          >
            ⬅ Prev
          </button>
          <span className="text-gray-300">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handleSearch(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 backdrop-blur-md text-white disabled:opacity-40"
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
}
