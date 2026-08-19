import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    const keyword = search.toLowerCase();

    const result = reports.filter((item) => {
      return (
        item.businessName.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword) ||
        item.location.toLowerCase().includes(keyword)
      );
    });

    setFilteredReports(result);
  }, [search, reports]);

  // Fetch Reports
  const fetchReports = async () => {
    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("https://bizguide-ai-backend.onrender.com/reports", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
        return;
      }

      if (data.success) {
        setReports(data.reports);
        setFilteredReports(data.reports);
      }

    } catch (error) {

      console.error(error);

      alert("Unable to load reports.");

    } finally {

      setLoading(false);

    }
  };

  // Delete Report
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

        alert("✅ Report deleted successfully.");

        fetchReports();

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error(error);

      alert("Unable to delete report.");

    }

  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="history-page">

      <div className="history-header">

        <h1>Business Analysis History</h1>

        <p>
          View all your AI-generated business reports.
        </p>

      </div>

      <div className="search-section">

        <input
          type="text"
          placeholder="Search by Business, Category or Location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="stats-container">

        <div className="stat-card">
          <h2>{reports.length}</h2>
          <span>Total Reports</span>
        </div>

        <div className="stat-card">
          <h2>
            {reports.length > 0
              ? formatDate(reports[0].createdAt)
              : "--"}
          </h2>

          <span>Latest Analysis</span>
        </div>

      </div>

      {loading ? (

        <div className="loading">
          Loading Reports...
        </div>

      ) : filteredReports.length === 0 ? (

        <div className="empty-history">

          <h2>No Reports Found</h2>

          <p>
            Start your first AI business analysis.
          </p>

          <button
            onClick={() => navigate("/analyze")}
          >
            Analyze Business
          </button>

        </div>

      ) : (

        <div className="history-grid">

          {filteredReports.map((item) => (

            <div
              className="history-card"
              key={item._id}
            >

              <div className="card-top">

                <h2>{item.businessName}</h2>

                <span className="status">
                  Completed
                </span>

              </div>

              <div className="card-details">

                <p>
                  <strong>Category:</strong> {item.category}
                </p>

                <p>
                  <strong>Location:</strong> {item.location}
                </p>

                <p>
                  <strong>Budget:</strong> ₹ {item.budget}
                </p>

                <p>
                  <strong>Date:</strong> {formatDate(item.createdAt)}
                </p>

              </div>

              <div className="card-buttons">

                <button
                  className="view-btn"
                  onClick={() =>
                    navigate("/report", {
                      state: item,
                    })
                  }
                >
                  View Report
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteReport(item._id)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default History;