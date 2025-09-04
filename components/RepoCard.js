"use client";
import { Star, GitFork, Clock } from "lucide-react";

export default function RepoCard({ repo }) {
  return (
    <div className="p-4 border rounded-2xl shadow hover:shadow-md transition bg-white">
      <h2 className="text-lg font-semibold text-blue-600">{repo.name}</h2>
      <p className="text-sm text-gray-600 line-clamp-2">{repo.description}</p>

      <div className="flex gap-4 mt-3 text-gray-700 text-sm">
        <span className="flex items-center gap-1"><Star size={16}/> {repo.stars}</span>
        <span className="flex items-center gap-1"><GitFork size={16}/> {repo.forks}</span>
        <span className="flex items-center gap-1"><Clock size={16}/> {repo.updated}</span>
      </div>
    </div>
  );
}
