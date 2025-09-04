"use client";
import { useState } from "react";

export default function Filters({ onChange }) {
  const [language, setLanguage] = useState("");
  const [stars, setStars] = useState("");
  const [updated, setUpdated] = useState("");
  const [sort, setSort] = useState("stars");

  const applyFilters = () => {
    onChange({ language, stars, updated, sort });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
      <select value={language} onChange={(e) => setLanguage(e.target.value)} className="border rounded-xl p-2">
        <option value="">All Languages</option>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="go">Go</option>
        <option value="rust">Rust</option>
      </select>

      <select value={stars} onChange={(e) => setStars(e.target.value)} className="border rounded-xl p-2">
        <option value="">Stars</option>
        <option value=">100">&gt; 100</option>
        <option value=">1000">&gt; 1000</option>
      </select>

      <select value={updated} onChange={(e) => setUpdated(e.target.value)} className="border rounded-xl p-2">
        <option value="">Last Updated</option>
        <option value="30">Last 30 days</option>
        <option value="365">Last year</option>
      </select>

      <select value={sort} onChange={(e) => setSort(e.target.value)} className="border rounded-xl p-2">
        <option value="stars">Sort by Stars</option>
        <option value="forks">Sort by Forks</option>
        <option value="updated">Sort by Last Update</option>
      </select>

      <button
        onClick={applyFilters}
        className="col-span-2 md:col-span-4 bg-blue-500 text-white rounded-xl py-2 mt-2"
      >
        Apply Filters
      </button>
    </div>
  );
}
