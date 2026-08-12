import "./ReportHeader.css";
import { useNavigate } from "react-router-dom";

function ReportHeader({ business }) {
  const navigate = useNavigate();

  const reportId = `BG-${new Date().getFullYear()}-${Date.now()
    .toString()
    .slice(-6)}`;

  const generatedDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="report-header">

      <div className="header-top">

        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>

        <button className="download-btn">
          📄 Download Report
        </button>

      </div>

      <div className="report-title">

        <h1>🚀 BizGuide AI</h1>

        <h2>BUSINESS ANALYSIS REPORT</h2>

        <p>
          AI Powered Business Intelligence Platform
        </p>

      </div>

      <div className="summary-grid">

        <div className="summary-item">
          <span>🏢 Business</span>
          <strong>{business.businessName}</strong>
        </div>

        <div className="summary-item">
          <span>💰 Investment</span>
          <strong>₹ {business.budget}</strong>
        </div>

        <div className="summary-item">
          <span>🏷 Category</span>
          <strong>{business.category}</strong>
        </div>

        <div className="summary-item">
          <span>📅 Generated</span>
          <strong>{generatedDate}</strong>
        </div>

        <div className="summary-item">
          <span>📍 Location</span>
          <strong>{business.location}</strong>
        </div>

        <div className="summary-item">
          <span>🆔 Report ID</span>
          <strong>{reportId}</strong>
        </div>

      </div>

      <div className="prepared-by">
        Prepared by <b>BizGuide AI</b> • Your AI Business Consultant
      </div>

    </header>
  );
}

export default ReportHeader;