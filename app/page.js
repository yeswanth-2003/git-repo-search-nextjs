"use client";
import { useSession } from "next-auth/react";
import FeaturesAfterLogin from "@/components/FeaturesAfterLogin";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">🔎 Git Repo Search+</h1>

      {/* Search Bar always available */}
      <SearchBar user={session?.user} />

      {/* Show feature list only if not logged in */}
      {!session && <FeaturesAfterLogin />}
    </div>
  );
}
