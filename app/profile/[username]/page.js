// app/profile/[username]/page.js
"use client";
import { useEffect, useState } from "react";
import ProfileHeader from "../../../components/ProfileHeader";
import LanguagePie from "../../../components/LanguagePie";
import TopProjects from "../../../components/TopProjects";
import ExportProfileButton from "../../../components/ExportProfileButton";

export default function ProfilePage({ params }) {
  const { username } = params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!username) return;
    setLoading(true);
    fetch(`/api/profile?username=${encodeURIComponent(username)}`)
      .then(res => res.json())
      .then(json => {
        if (json.error) setErr(json.error);
        else setData(json);
      })
      .catch(e => setErr(e.message))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) return <div className="p-8">Loading profile...</div>;
  if (err) return <div className="p-8 text-red-600">Error: {err}</div>;
  if (!data) return <div className="p-8">Enter a username to view profile.</div>;

  return (
    <main className="p-8">
      <div id="profile-export" className="space-y-6">
        <ProfileHeader username={data.username} repoCount={data.repoCount} totalStars={data.totalStars} totalForks={data.totalForks} />

        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Top Projects</h3>
            <TopProjects projects={data.topByStars} />
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Language Heatmap</h3>
            <LanguagePie data={data.languagePie} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">All Repositories</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {data.repos.map(r => (
              <a key={r.id} href={r.html_url} className="p-3 border rounded-lg hover:shadow transition" target="_blank" rel="noreferrer">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-blue-600">{r.full_name}</div>
                    <div className="text-sm text-gray-700 line-clamp-2">{r.description}</div>
                  </div>
                  <div className="text-sm text-gray-600 text-right">
                    <div>★ {r.stars}</div>
                    <div>🍴 {r.forks}</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <ExportProfileButton targetId="profile-export" />
      </div>
    </main>
  );
}
