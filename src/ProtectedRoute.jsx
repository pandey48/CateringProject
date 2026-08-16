import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  const user =
    JSON.parse(localStorage.getItem("user") || "null") ||
    JSON.parse(sessionStorage.getItem("user") || "null");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}