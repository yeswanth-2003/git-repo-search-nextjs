"use client";

export default function ProfileHeader({ username, repoCount, totalStars, totalForks }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold">@{username}</h2>
        <div className="text-sm text-gray-600 mt-1">Repos: {repoCount} • Stars: {totalStars} • Forks: {totalForks}</div>
      </div>
      <div className="flex gap-2">
        {/* Placeholder for actions like follow, export (Export button provided separately) */}
      </div>
    </div>
  );
}
