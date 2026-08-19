import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalReports: 0,
    totalAnalyses: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  // =============================
  // Fetch Dashboard
  // =============================

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      // Check login
      if (!token) {
        navigate("/login");
        return;
      }

      // Check admin
      if (user?.role !== "admin") {
        alert("Admin access only.");
        navigate("/");
        return;
      }

      const response = await fetch(
        "https://bizguide-ai-backend.onrender.com/api/admin/dashboard",
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      // Unauthorized
      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
        return;
      }

      // Forbidden
      if (response.status === 403) {
        alert("Admin access only.");
        navigate("/");
        return;
      }

      if (!data.success) {
        alert(
          data.message ||
          "Failed to load dashboard."
        );

        return;
      }

      setStats(data.stats);

    } catch (error) {

      console.error(
        "Admin Dashboard Error:",
        error
      );

      alert(
        "Unable to connect to server."
      );

    } finally {

      setLoading(false);

    }
  };

  // =============================
  // Loading
  // =============================

  if (loading) {
    return (
      <div className="admin-loading">

        <h2>
          Loading Admin Dashboard...
        </h2>

      </div>
    );
  }

  // =============================
  // Dashboard
  // =============================

  return (
    <div className="admin-page">

      {/* ============================= */}
      {/* Header */}
      {/* ============================= */}

      <div className="admin-header">

        <div>

          <span className="admin-badge">
            ADMIN PANEL
          </span>

          <h1>
            Admin Dashboard
          </h1>

          <p>
            Manage BizGuide AI users, reports
            and business analysis activity.
          </p>

        </div>

      </div>


      {/* ============================= */}
      {/* Statistics */}
      {/* ============================= */}

      <div className="admin-stats">

        {/* Total Users */}

        <div className="admin-stat-card">

          <div className="stat-icon">
            👥
          </div>

          <div>

            <h2>
              {stats.totalUsers}
            </h2>

            <p>
              Total Users
            </p>

          </div>

        </div>


        {/* Total Reports */}

        <div className="admin-stat-card">

          <div className="stat-icon">
            📄
          </div>

          <div>

            <h2>
              {stats.totalReports}
            </h2>

            <p>
              Total Reports
            </p>

          </div>

        </div>


        {/* Total Analyses */}

        <div className="admin-stat-card">

          <div className="stat-icon">
            🤖
          </div>

          <div>

            <h2>
              {stats.totalAnalyses}
            </h2>

            <p>
              Total AI Analyses
            </p>

          </div>

        </div>

      </div>


      {/* ============================= */}
      {/* Admin Actions */}
      {/* ============================= */}

      <div className="admin-actions">

        <h2>
          Administration
        </h2>


        <div className="admin-action-grid">

          {/* ============================= */}
          {/* User Management */}
          {/* ============================= */}

          <button
            className="admin-action-card"
            onClick={() =>
              navigate("/admin/users")
            }
          >

            <span>
              👥
            </span>

            <div>

              <h3>
                User Management
              </h3>

              <p>
                View and manage registered
                users.
              </p>

            </div>

          </button>


          {/* ============================= */}
          {/* Report Management */}
          {/* ============================= */}

          <button
            className="admin-action-card"
            onClick={() =>
              navigate("/admin/reports")
            }
          >

            <span>
              📊
            </span>

            <div>

              <h3>
                Report Management
              </h3>

              <p>
                View and manage business
                reports.
              </p>

            </div>

          </button>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;