export default function FeaturesAfterLogin() {
  const features = [
    {
      title: "📜 Search History",
      desc: "Your past searches are saved automatically. Quickly revisit repos you found earlier.",
    },
    {
      title: "🔖 Bookmarks & Collections",
      desc: "Save your favorite repos into collections (e.g., 'React ideas') and access them anytime.",
    },
    {
      title: "📊 GitHub Profile Dashboard",
      desc: "View your repos, top projects, and language usage heatmap in one place.",
    },
    {
      title: "📈 Repo Analytics",
      desc: "Track star growth, compare repos, and discover trending projects faster.",
    },
    {
      title: "📄 Export as PDF",
      desc: "Turn your GitHub profile into a professional résumé in one click.",
    },
  ];

  return (
    <div className="mt-8 p-6 bg-gray-50 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">✨ Unlock More with Login</h2>
      <ul className="space-y-3">
        {features.map((f, i) => (
          <li key={i} className="p-3 bg-white rounded-md shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold">{f.title}</h3>
            <p className="text-sm text-gray-600">{f.desc}</p>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-center">
        <button
          onClick={() => (window.location.href = "/api/auth/signin")}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          🔐 Login with GitHub
        </button>
      </div>
    </div>
  );
}
