import "./ExecutiveSummary.css";
import {
  FaRobot,
  FaCheckCircle,
  FaLightbulb,
} from "react-icons/fa";

function ExecutiveSummary({ report }) {
  if (!report) return null;

  const summary = report.summary || "No summary available.";

  return (
    <section className="summary-section">

      {/* Header */}

      <div className="summary-header">

        <div className="summary-title">

          <div className="summary-icon">
            <FaRobot />
          </div>

          <div>
            <span>AI INSIGHT</span>

            <h2>Executive Summary</h2>

            <p>
              A concise overview of your AI-generated business analysis.
            </p>
          </div>

        </div>

        <div className="ai-generated">
          <FaCheckCircle />
          AI Generated
        </div>

      </div>


      {/* Main Summary */}

      <div className="summary-card">

        <div className="summary-card-label">
          <FaLightbulb />
          Key Business Insight
        </div>

        <p>
          {summary}
        </p>

      </div>


      {/* Highlights */}

      <div className="summary-highlights">

        <div className="highlight-card">

          <div className="highlight-icon">
            <FaCheckCircle />
          </div>

          <div>
            <strong>AI Analysis</strong>
            <span>Intelligent business evaluation</span>
          </div>

        </div>

        <div className="highlight-card">

          <div className="highlight-icon">
            <FaCheckCircle />
          </div>

          <div>
            <strong>Market Insights</strong>
            <span>Demand and opportunity analysis</span>
          </div>

        </div>

        <div className="highlight-card">

          <div className="highlight-icon">
            <FaCheckCircle />
          </div>

          <div>
            <strong>Financial Evaluation</strong>
            <span>Investment and profitability insights</span>
          </div>

        </div>

      </div>

    </section>
  );
}

export default ExecutiveSummary;