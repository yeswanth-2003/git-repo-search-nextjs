"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/history?userId=${session.user.id}`)
        .then((res) => res.json())
        .then(setHistory);
    }
  }, [session]);

  return (
    <main className="p-8">
      <h1 className="text-xl font-bold mb-4">Search History</h1>
      <ul className="space-y-2">
        {history.map((item) => (
          <li key={item._id} className="border p-2 rounded-xl">
            {item.query} <span className="text-gray-500 text-sm">({new Date(item.timestamp).toLocaleString()})</span>
          </li>
        ))}
      </ul>
    </main>
  );
}

