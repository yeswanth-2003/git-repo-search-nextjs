import { useState } from "react";

export default function SearchBar({ user }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  async function handleSearch(e) {
    e.preventDefault();

    // 🔍 Call GitHub API (no login needed)
    const res = await fetch(`https://api.github.com/search/repositories?q=${query}`);
    const data = await res.json();
    setResults(data.items || []);

    // 📝 Save to history only if logged in
    await fetch("/api/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user?.id, query }),
    });
  }

  return (
    <div className="p-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search GitHub repos..."
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded">
          Search
        </button>
      </form>

      <ul className="mt-4 space-y-2">
        {results.map((repo) => (
          <li key={repo.id} className="border p-2 rounded">
            <a href={repo.html_url} target="_blank" rel="noreferrer">
              <strong>{repo.full_name}</strong>
            </a>
            <p>{repo.description}</p>
            <p>⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
