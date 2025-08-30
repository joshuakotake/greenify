// src/Pages.jsx
import { Routes, Route, Navigate, useLocation } from "react-router";
import AuthRoute from "./components/AuthRoute";
import ProtectedRoute from "./components/ProtectedRoutes";
import Header from "./components/Header";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import PlannerPage from "./pages/PlannerPage";
import Leaderboard from "./pages/Leaderboard";

export default function Pages() {
  const location = useLocation();

  // Show header only on public and auth pages, not on protected pages
  const showHeader = ["/", "/login", "/register"].includes(location.pathname);

  return (
    <div>
      {showHeader && <Header />}
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth (redirect to dashboard if already logged in) */}
        <Route
          path="/login"
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRoute>
              <RegisterPage />
            </AuthRoute>
          }
        />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/planner"
          element={
            <ProtectedRoute>
              <PlannerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
}
