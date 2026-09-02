import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaFileAlt,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaEye,
  FaTrash,
  FaChartLine,
  FaArrowRight,
  FaHistory,
} from "react-icons/fa";

import "./History.css";

function History() {
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    const keyword = search.toLowerCase().trim();

    const result = reports.filter((item) => {
      return (
        (item.businessName || "").toLowerCase().includes(keyword) ||
        (item.category || "").toLowerCase().includes(keyword) ||
        (item.location || "").toLowerCase().includes(keyword)
      );
    });

    setFilteredReports(result);
  }, [search, reports]);

  /* ========================= */
  /* FETCH REPORTS */
  /* ========================= */

  const fetchReports = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        "https://bizguide-ai-backend.onrender.com/reports",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
        return;
      }

      if (data.success) {
        setReports(data.reports || []);
        setFilteredReports(data.reports || []);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to load reports.");
    } finally {
      setLoading(false);
    }
  };

  /* ========================= */
  /* DELETE REPORT */
  /* ========================= */

  const deleteReport = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this report?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://bizguide-ai-backend.onrender.com/reports/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Report deleted successfully.");
        fetchReports();
      } else {
        alert(data.message || "Unable to delete report.");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to delete report.");
    }
  };

  /* ========================= */
  /* DATE */
  /* ========================= */

  const formatDate = (date) => {
    if (!date) return "--";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  /* ========================= */
  /* VIEW REPORT */
  /* ========================= */

  const viewReport = (item) => {
    navigate("/report", {
      state: {
        business: {
          businessName: item.businessName,
          category: item.category,
          location: item.location,
          budget: item.budget,
          description: item.description,
        },
        report: item.report,
        reportId: item._id,
      },
    });
  };

  return (
    <div className="history-page">

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <section className="history-hero">

        <div className="history-hero-content">

          <div className="history-eyebrow">
            <FaHistory />
            <span>YOUR BUSINESS JOURNEY</span>
          </div>

          <h1>
            Analysis <span>History</span>
          </h1>

          <p>
            Review your previous AI-generated business reports,
            track your ideas, and revisit your business insights.
          </p>

        </div>

        <div className="history-hero-icon">
          <FaChartLine />
        </div>

      </section>


      {/* ========================= */}
      {/* SEARCH */}
      {/* ========================= */}

      <div className="history-search">

        <FaSearch />

        <input
          type="text"
          placeholder="Search by business, category or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <button
            className="clear-search"
            onClick={() => setSearch("")}
          >
            ×
          </button>
        )}

      </div>


      {/* ========================= */}
      {/* STATISTICS */}
      {/* ========================= */}

      <div className="history-stats">

        <div className="history-stat">

          <div className="stat-icon">
            <FaFileAlt />
          </div>

          <div>
            <strong>{reports.length}</strong>
            <span>Total Reports</span>
          </div>

        </div>


        <div className="history-stat">

          <div className="stat-icon">
            <FaCalendarAlt />
          </div>

          <div>
            <strong>
              {reports.length > 0
                ? formatDate(reports[0].createdAt)
                : "--"}
            </strong>

            <span>Latest Analysis</span>
          </div>

        </div>


        <div className="history-stat">

          <div className="stat-icon">
            <FaChartLine />
          </div>

          <div>
            <strong>{filteredReports.length}</strong>
            <span>Matching Results</span>
          </div>

        </div>

      </div>


      {/* ========================= */}
      {/* SECTION HEADER */}
      {/* ========================= */}

      {!loading && reports.length > 0 && (
        <div className="reports-heading">

          <div>
            <span>REPORT LIBRARY</span>

            <h2>
              Your Business Reports
            </h2>
          </div>

          <span className="report-count">
            {filteredReports.length}{" "}
            {filteredReports.length === 1
              ? "Report"
              : "Reports"}
          </span>

        </div>
      )}


      {/* ========================= */}
      {/* LOADING */}
      {/* ========================= */}

      {loading ? (

        <div className="history-loading">

          <div className="loading-spinner"></div>

          <h3>
            Loading Your Reports
          </h3>

          <p>
            Fetching your business analysis history...
          </p>

        </div>

      ) : filteredReports.length === 0 ? (

        /* ========================= */
        /* EMPTY STATE */
        /* ========================= */

        <div className="history-empty">

          <div className="empty-icon">
            <FaFileAlt />
          </div>

          <span>NO REPORTS FOUND</span>

          <h2>
            {search
              ? "No Matching Reports"
              : "Start Your Business Journey"}
          </h2>

          <p>
            {search
              ? "Try searching with a different business name, category, or location."
              : "Create your first AI-powered business analysis and your report will appear here."}
          </p>

          <button
            onClick={() => navigate("/analyze")}
          >
            <span>Analyze a Business</span>
            <FaArrowRight />
          </button>

        </div>

      ) : (

        /* ========================= */
        /* REPORT GRID */
        /* ========================= */

        <div className="history-grid">

          {filteredReports.map((item) => (

            <article
              className="history-card"
              key={item._id}
            >

              {/* Card top */}

              <div className="history-card-top">

                <div className="business-icon">
                  <FaFileAlt />
                </div>

                <span className="completed-badge">
                  <span></span>
                  Completed
                </span>

              </div>


              {/* Business */}

              <div className="business-info">

                <span className="business-category">
                  {item.category || "Business Analysis"}
                </span>

                <h3>
                  {item.businessName || "Untitled Business"}
                </h3>

              </div>


              {/* Details */}

              <div className="history-details">

                <div className="history-detail">

                  <FaMapMarkerAlt />

                  <div>
                    <span>LOCATION</span>
                    <strong>
                      {item.location || "--"}
                    </strong>
                  </div>

                </div>


                <div className="history-detail">

                  <FaMoneyBillWave />

                  <div>
                    <span>BUDGET</span>
                    <strong>
                      ₹ {Number(item.budget || 0).toLocaleString("en-IN")}
                    </strong>
                  </div>

                </div>


                <div className="history-detail">

                  <FaCalendarAlt />

                  <div>
                    <span>ANALYZED ON</span>
                    <strong>
                      {formatDate(item.createdAt)}
                    </strong>
                  </div>

                </div>

              </div>


              {/* Actions */}

              <div className="history-actions">

                <button
                  className="history-view-btn"
                  onClick={() => viewReport(item)}
                >
                  <FaEye />
                  <span>View Report</span>
                </button>

                <button
                  className="history-delete-btn"
                  onClick={() => deleteReport(item._id)}
                  title="Delete Report"
                >
                  <FaTrash />
                </button>

              </div>

            </article>

          ))}

        </div>

      )}

    </div>
  );
}

export default History;