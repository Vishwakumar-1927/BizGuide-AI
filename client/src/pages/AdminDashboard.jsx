import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUsers,
  FiFileText,
  FiCpu,
  FiArrowRight,
  FiShield,
  FiActivity,
} from "react-icons/fi";
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

      alert("Unable to connect to server.");
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
        <div className="admin-loader">
          <div className="loader-ring"></div>

          <h2>
            Loading Admin Dashboard
          </h2>

          <p>
            Preparing your administration panel...
          </p>
        </div>
      </div>
    );
  }

  // =============================
  // Dashboard
  // =============================

  return (
    <div className="admin-page">

      {/* ============================= */}
      {/* Hero */}
      {/* ============================= */}

      <section className="admin-hero">

        <div className="hero-content">

          <div className="admin-badge">
            <FiShield />
            ADMIN PANEL
          </div>

          <h1>
            Admin Dashboard
          </h1>

          <p>
            Manage BizGuide AI users, reports
            and business analysis activity
            from one centralized dashboard.
          </p>

        </div>

        <div className="hero-decoration">
          <FiActivity />
        </div>

      </section>


      {/* ============================= */}
      {/* Statistics */}
      {/* ============================= */}

      <section className="admin-stats">

        {/* Total Users */}

        <div className="admin-stat-card">

          <div className="stat-icon users-icon">
            <FiUsers />
          </div>

          <div className="stat-content">

            <span>
              TOTAL USERS
            </span>

            <h2>
              {stats.totalUsers}
            </h2>

            <p>
              Registered users
            </p>

          </div>

          <div className="stat-line"></div>

        </div>


        {/* Total Reports */}

        <div className="admin-stat-card">

          <div className="stat-icon reports-icon">
            <FiFileText />
          </div>

          <div className="stat-content">

            <span>
              TOTAL REPORTS
            </span>

            <h2>
              {stats.totalReports}
            </h2>

            <p>
              Business reports
            </p>

          </div>

          <div className="stat-line"></div>

        </div>


        {/* Total Analyses */}

        <div className="admin-stat-card">

          <div className="stat-icon analysis-icon">
            <FiCpu />
          </div>

          <div className="stat-content">

            <span>
              AI ANALYSES
            </span>

            <h2>
              {stats.totalAnalyses}
            </h2>

            <p>
              AI business analyses
            </p>

          </div>

          <div className="stat-line"></div>

        </div>

      </section>


      {/* ============================= */}
      {/* Administration */}
      {/* ============================= */}

      <section className="admin-actions">

        <div className="section-heading">

          <div>

            <span className="section-kicker">
              MANAGEMENT
            </span>

            <h2>
              Administration
            </h2>

          </div>

          <p>
            Manage your BizGuide AI platform
          </p>

        </div>


        <div className="admin-action-grid">

          {/* User Management */}

          <button
            className="admin-action-card"
            onClick={() =>
              navigate("/admin/users")
            }
          >

            <div className="action-icon">
              <FiUsers />
            </div>

            <div className="action-content">

              <span className="action-number">
                01
              </span>

              <h3>
                User Management
              </h3>

              <p>
                View and manage registered
                BizGuide AI users.
              </p>

              <div className="action-link">
                Manage Users
                <FiArrowRight />
              </div>

            </div>

          </button>


          {/* Report Management */}

          <button
            className="admin-action-card"
            onClick={() =>
              navigate("/admin/reports")
            }
          >

            <div className="action-icon">
              <FiFileText />
            </div>

            <div className="action-content">

              <span className="action-number">
                02
              </span>

              <h3>
                Report Management
              </h3>

              <p>
                View and manage generated
                business reports.
              </p>

              <div className="action-link">
                Manage Reports
                <FiArrowRight />
              </div>

            </div>

          </button>

        </div>

      </section>

    </div>
  );
}

export default AdminDashboard;