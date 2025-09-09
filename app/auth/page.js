"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({ email: "", password: "", username: "" });
  const router = useRouter();

  // 🚀 Redirect to home after login
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/"); // redirect to home
    }
  }, [status, router]);

  // Signup API
  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Account created! Please log in 🚀");
      setIsLogin(true);
    } else {
      const { error } = await res.json();
      alert(error || "Signup failed");
    }
  };

  // Login API (NextAuth credentials)
  const handleLogin = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false, // prevent auto-redirect (we handle with useEffect)
    });
  };

  // Don't render login form while NextAuth is checking session
  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Checking session...
      </div>
    );
  }

  // --- Form UI (same as before) ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-gray-200 flex items-center justify-center p-6">
      <div className="relative w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl overflow-hidden">
          <h1 className="text-2xl font-bold text-center mb-6 text-white">
            {isLogin ? "Welcome Back 👋" : "Create an Account 🚀"}
          </h1>

          <div className="relative h-80">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.form
                  key="login"
                  onSubmit={handleLogin}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col space-y-4"
                >
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 text-white outline-none"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 text-white outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-xl px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold hover:scale-105 transition-transform"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => signIn("github")}
                    className="rounded-xl px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-semibold hover:scale-105 transition-transform"
                  >
                    Login with GitHub
                  </button>
                  <p className="text-sm text-gray-400 text-center">
                    Don’t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(false)}
                      className="text-blue-400 hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                </motion.form>
              ) : (
                <motion.form
                  key="signup"
                  onSubmit={handleSignup}
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 300, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col space-y-4"
                >
                  <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 text-white outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 text-white outline-none"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 text-white outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-xl px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold hover:scale-105 transition-transform"
                  >
                    Sign Up
                  </button>
                  <p className="text-sm text-gray-400 text-center">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(true)}
                      className="text-blue-400 hover:underline"
                    >
                      Login
                    </button>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
