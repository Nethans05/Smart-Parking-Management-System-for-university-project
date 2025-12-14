import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Topbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6">
      <div>
        <h1 className="text-lg font-semibold text-slate-800">Dashboard</h1>
        <p className="text-xs text-slate-500">Smart Parking Management</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-semibold text-slate-800 leading-4">
            {user?.fullName || "User"}
          </p>
          <p className="text-xs text-slate-500">
            Role: <span className="font-medium uppercase">{user?.role || "-"}</span>
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="h-9 px-4 rounded-full bg-slate-900 text-white text-xs font-medium hover:bg-slate-800"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Topbar;
