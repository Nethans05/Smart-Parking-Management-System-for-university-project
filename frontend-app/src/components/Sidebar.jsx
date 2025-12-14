import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navClass = ({ isActive }) =>
  `block px-3 py-2 rounded-lg text-sm transition ${
    isActive ? "bg-slate-800 text-emerald-400 font-medium" : "hover:bg-slate-800"
  }`;

function Sidebar() {
  const { user } = useAuth();
  const role = user?.role || "student";

  const show = {
    dashboard: true,
    book: role !== "admin",                 // admin doesn't book
    bookings: role !== "admin",             // admin doesn't have “my bookings”
    payments: role === "student" || role === "lecturer",
    reports: role === "admin",
    settings: role === "admin" || role === "lecturer",
    support: true,
  };

  return (
    <aside className="min-h-screen w-64 bg-slate-950 text-slate-100 flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <span className="text-2xl font-bold text-emerald-400">PARKLY</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <p className="text-xs font-semibold text-slate-400 uppercase mb-3">Main</p>

        {show.dashboard && <NavLink to="/" end className={navClass}>Dashboard</NavLink>}
        {show.book && <NavLink to="/book" className={navClass}>Book Parking</NavLink>}
        {show.bookings && <NavLink to="/bookings" className={navClass}>My Bookings</NavLink>}
        {show.payments && <NavLink to="/payments" className={navClass}>Payments</NavLink>}
        {show.reports && <NavLink to="/reports" className={navClass}>Reports (Admin)</NavLink>}

        <p className="text-xs font-semibold text-slate-400 uppercase mt-6 mb-3">Support</p>
        {show.support && <NavLink to="/support" className={navClass}>Help &amp; Support</NavLink>}
        {show.settings && <NavLink to="/settings" className={navClass}>Settings</NavLink>}
      </nav>

      <div className="px-4 py-4 border-t border-slate-800 text-xs text-slate-400">
        Logged in as{" "}
        <span className="text-slate-200 font-medium">
          {user?.fullName || "User"} ({role})
        </span>
      </div>
    </aside>
  );
}

export default Sidebar;
