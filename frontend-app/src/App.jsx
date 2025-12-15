import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import BookParkingPage from "./pages/BookParkingPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import PaymentsPage from "./pages/PaymentsPage";
import ReportsPage from "./pages/ReportsPage";
import SupportPage from "./pages/SupportPage";
import SettingsPage from "./pages/SettingsPage";
import Login from "./pages/Login";
import Register from "./pages/Regiser";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard Layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="book" element={<BookParkingPage />} />
          <Route path="bookings" element={<MyBookingsPage />} />
          <Route path="payments" element={<PaymentsPage />} />

          {/* Admin-only route */}
          <Route
            path="reports"
            element={
              <ProtectedRoute allowRoles={["admin"]}>
                <ReportsPage />
              </ProtectedRoute>
            }
          />

          <Route path="support" element={<SupportPage />} />

          {/* Admin + Lecturer only (example) */}
          <Route
            path="settings"
            element={
              <ProtectedRoute allowRoles={["admin", "lecturer"]}>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Default + fallback */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
