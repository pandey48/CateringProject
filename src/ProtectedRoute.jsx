"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    let user = null;

    try {
      user = JSON.parse(localStorage.getItem("user") || "null") ||
        JSON.parse(sessionStorage.getItem("user") || "null");
    } catch {
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
    }

    if (!token) {
      router.replace("/login");
      return;
    }

    if (user?.role !== "admin") {
      router.replace("/");
      return;
    }

    setAuthorized(true);
  }, [router]);

  if (!authorized) {
    return <div className="p-6 text-sm text-slate-600">Verifying admin access...</div>;
  }

  return children;
}
