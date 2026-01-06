import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const rolesRaw = localStorage.getItem("roles");

  if (!token || !rolesRaw) return <Navigate to="/login" replace />;

  let roles = [];
  try {
    roles = JSON.parse(rolesRaw);
  } catch {
    return <Navigate to="/login" replace />;
  }

  const path = location.pathname.toLowerCase();

  // Contoh mapping path ke role
  const roleRequiredForPath = () => {
    if (path.startsWith("/admin")) return "admin";
    if (path.startsWith("/user")) return "user";
    return null;
  };

  const requiredRole = roleRequiredForPath();
  if (!requiredRole) return <Navigate to="/login" replace />;

  const hasRole = roles.some((r) => r.toLowerCase() === requiredRole.toLowerCase());
  if (!hasRole) return <Navigate to="/login" replace />;

  return children;
}
