import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowRoles }) {
  // Temporary bypass for authentication
  const tempBypass = true;

  if (tempBypass) {
    return children;
  }

  const { isAuthenticated, loading, user } = useAuth();

  if (loading) return <div className="min-h-screen bg-slate-100" />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (allowRoles?.length) {
    const role = user?.role;
    if (!allowRoles.includes(role)) return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
