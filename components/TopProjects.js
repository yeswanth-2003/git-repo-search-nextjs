"use client";

export default function TopProjects({ projects = [] }) {
  if (!projects || projects.length === 0) return <div className="p-4">No projects to show</div>;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {projects.map(proj => (
        <a href={proj.html_url} target="_blank" rel="noreferrer" key={proj.id} className="p-4 border rounded-lg hover:shadow transition bg-white">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-blue-600">{proj.name}</h3>
            <div className="text-sm text-gray-600">{proj.language || "Other"}</div>
          </div>
          <p className="text-sm text-gray-700 mt-2 line-clamp-3">{proj.description}</p>
          <div className="flex gap-4 text-sm text-gray-600 mt-3">
            <span>★ {proj.stars}</span>
            <span>🍴 {proj.forks}</span>
            <span>Updated: {new Date(proj.updated_at).toLocaleDateString()}</span>
          </div>
        </a>
      ))}
    </div>
  );
}
