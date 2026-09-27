"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Lock,
  User,
  ChefHat,
  LogIn,
} from "lucide-react";
import API_URL from "../config";

export default function LoginModal() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!username || !password) {
      setError("Please enter ID and Password");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.msg || "Invalid ID or Password");
        return;
      }

      // Only Admin can enter dashboard
      if (data.user?.role !== "admin") {
        setError("You are not authorized to access Admin Dashboard");
        return;
      }

      // Save authentication
      if (remember) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Remove old session data
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
      } else {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user));

        // Remove old local data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }

      // Redirect to Admin
      router.replace("/admin");

    } catch (error) {
      console.error("Login Error:", error);
      setError("Server connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="fixed inset-0 overflow-y-auto bg-[url('https://images.unsplash.com/photo-1555244162-803834f70033')] bg-cover bg-center">

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative flex min-h-screen items-center justify-center p-4 py-10">

        <div className="animate-rise-in w-full max-w-md rounded-4xl border border-white/20 bg-slate-950/55 p-6 shadow-2xl backdrop-blur-xl sm:p-8">

          {/* Logo */}
          <div className="flex justify-center mb-5">
            <div className="animate-soft-pulse flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-r from-yellow-500 to-orange-500 shadow-lg">
              <ChefHat className="text-white" size={42} />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-4xl font-bold text-center text-white">
            Pandey Event Management
          </h2>

          <p className="text-center text-gray-200 mt-2">
            Admin Dashboard Login
          </p>

          {/* Username */}
          <div className="mt-8 relative">

            <User
              className="absolute left-4 top-3 text-gray-300"
              size={20}
            />

            <input
              type="text"
              placeholder="Admin ID"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
              className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-yellow-400"
            />

          </div>

          {/* Password */}
          <div className="mt-5 relative">

            <Lock
              className="absolute left-4 top-3 text-gray-300"
              size={20}
            />

            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
              className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-12 pr-12 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-4 top-3 text-gray-300 hover:text-white"
            >
              {show ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          {/* Remember Me */}
          <div className="flex justify-between items-center mt-5">

            <label className="flex items-center gap-2 text-white cursor-pointer">

              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />

              Remember Me

            </label>

          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 bg-red-500/20 border border-red-400/30 rounded-lg p-3">
              <p className="text-red-300 text-center text-sm">
                {error}
              </p>
            </div>
          )}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-linear-to-r from-yellow-500 to-orange-500 py-3 font-bold text-white duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
          >

            <LogIn size={20} />

            {loading ? "Logging in..." : "Login"}

          </button>

          {/* Footer */}
          <div className="text-center mt-8 text-gray-300 text-sm">
            © 2026 Pandey Event Management
          </div>

        </div>

      </div>

    </main>
  );
}