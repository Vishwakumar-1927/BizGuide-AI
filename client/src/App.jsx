import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Analyze from "./pages/Analyze";
import Report from "./pages/Report";
import About from "./pages/About";
import History from "./pages/History";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import ReportManagement from "./pages/ReportManagement";

function App() {
  return (
    <>
      {/* ============================= */}
      {/* Navbar */}
      {/* ============================= */}

      <Navbar />

      <Routes>

        {/* ============================= */}
        {/* Public Routes */}
        {/* ============================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/analyze"
          element={<Analyze />}
        />

        <Route
          path="/report"
          element={<Report />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ============================= */}
        {/* Protected Routes */}
        {/* ============================= */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        {/* ============================= */}
        {/* Admin Dashboard */}
        {/* ============================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ============================= */}
        {/* Admin User Management */}
        {/* ============================= */}

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <UserManagement />
            </ProtectedRoute>
          }
        />

        {/* ============================= */}
        {/* Admin Report Management */}
        {/* ============================= */}

        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute>
              <ReportManagement />
            </ProtectedRoute>
          }
        />

      </Routes>

      {/* ============================= */}
      {/* Footer */}
      {/* ============================= */}

      <Footer />
    </>
  );
}

export default App;