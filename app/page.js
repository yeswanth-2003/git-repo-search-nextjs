"use client";
import { useState,useEffect,useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
const [isOpen, setIsOpen] = useState(false);
const menuRef = useRef(null);
const router = useRouter();

useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  const perPage = 15;

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
    <div className="min-h-screen bg-gradient-to-br from-black-500 via-gray-900 to-black text-gray-400 flex flex-col items-center p-8 relative">
      {/* Hamburger Menu */}
      {/* Hamburger Menu */}
<div className="absolute top-6 right-6 z-50" ref={menuRef}>
  <button
    className="w-10 h-10 flex mt-1 items-center justify-center text-3xl focus:outline-none transition-transform duration-300"
    onClick={() => setIsOpen(!isOpen)}
  >
    <span
      className={`transform transition-transform duration-300 ${
        isOpen ? "rotate-180 scale-110" : "rotate-0 scale-100"
      }`}
    >
      {isOpen ? <IoClose /> : <GiHamburgerMenu />}
    </span>
  </button>

  {/* Dropdown Menu */}
  {isOpen && (
    <div
      className="absolute right-0 mt-3 w-56 rounded-xl bg-white/10 border border-white/20 backdrop-blur-3xl shadow-lg p-3 flex flex-col space-y-3
                 animate-[fadeIn_0.3s_ease-out]"
    >
      <button className="flex items-center gap-2 text-white text-left hover:text-blue-400 transition-colors" onClick={() => router.push('/history')}>
         View History
      </button>
      <button className="flex items-center gap-2 text-white text-left hover:text-blue-400 transition-colors">
         Upgrade to Pro
      </button>
      <button className="flex items-center gap-2 text-white text-left hover:text-blue-400 transition-colors" onClick={() => router.push('/auth')}>
         Login / Signup
      </button>
      <button className="flex items-center gap-2 text-white text-left hover:text-blue-400 transition-colors">
         Profile
      </button>
       <button
            onClick={() => signOut()}
            className="flex items-center gap-2 text-red-400 text-left hover:text-red-700 transition-colors"
          >
            Logout
          </button>
    </div>
  )}
</div>


      <h1 className="text-3xl font-bold mb-6">
        RepoScout – GitHub Repo Search Tool
      </h1>

      {/* Search Bar */}
      <div className="flex gap-2 mb-10 w-full max-w-xl border-white/20 overflow-hidden">
        <input
          type="text"
          placeholder="Search Repositories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch(1)}
          className="flex-1 rounded-xl px-4 py-3 bg-white/10 border border-white/20 backdrop-blur-md text-white placeholder-gray-300 outline-none"
        />
        <button
          onClick={() => handleSearch(1)}
          className="rounded-xl px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold hover:scale-105 transition-transform"
        >
          Search
        </button>
      </div>

      {/* Results */}
      <div className="grid gap-6 w-full max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {loading && (
          <div className="flex flex-col justify-center items-center h-64 space-y-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-300 text-xl font-semibold">Loading...</p>
          </div>
        )}
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
