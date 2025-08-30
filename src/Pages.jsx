import { BrowserRouter as Router, Routes, Route } from "react-router";
import AuthRoute from "./components/AuthRoute";
import ProtectedRoute from "./components/ProtectedRoutes";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth routes - redirect to dashboard if logged in */}
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

      {/* Protected routes - require authentication */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Add more protected routes here */}
      {/* <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} /> */}
      {/* <Route path="/friends" element={<ProtectedRoute><Friends /></ProtectedRoute>} /> */}
    </Routes>
  );
}

export default App;
