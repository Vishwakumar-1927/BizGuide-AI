import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {
    const token = localStorage.getItem("token");
    const user = JSON.parse(
        localStorage.getItem("user")
    );

    // =====================================
    // Not Logged In
    // =====================================

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // =====================================
    // Admin Only
    // =====================================

    if (adminOnly && user?.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    // =====================================
    // Access Granted
    // =====================================

    return children;
}

export default ProtectedRoute;