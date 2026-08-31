import "./ReportHeader.css";

function ReportHeader() {
  return (
    <div className="report-header">

      <div className="report-header-badge">
        <span className="report-badge-dot"></span>
        AI BUSINESS INTELLIGENCE
      </div>

      <div className="report-header-icon">
        📊
      </div>

      <h1>
        BizGuide AI
        <span> Business Report</span>
      </h1>

      <p>
        AI-powered insights to help you understand your market,
        investment, competition, and business growth potential.
      </p>

      <div className="report-header-line"></div>

    </div>
  );
}

export default ReportHeader;