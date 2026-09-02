import "./BusinessDashboard.css";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import {
  FaChartLine,
  FaShieldAlt,
  FaMoneyBillWave,
  FaCheckCircle,
} from "react-icons/fa";

function BusinessDashboard({ report }) {
  if (!report) return null;

  const score = Number(report.finalVerdict?.businessScore || 0);

  const decision =
    report.finalVerdict?.decision || "N/A";

  const reason =
    report.finalVerdict?.reason ||
    "No recommendation available.";

  const demand =
    report.marketAnalysis?.marketDemand || "";

  const risk =
    report.riskAssessment?.riskLevel || "Medium";

  const marginText =
    report.financialAnalysis?.profitMargin || "";

  // Extract only percentage
  const margin =
    marginText.match(/\d+%/)?.[0] || "--";

  const getDemand = () => {
    const text = demand.toLowerCase();

    if (text.includes("high")) return "High";
    if (text.includes("moderate")) return "Medium";
    if (text.includes("low")) return "Low";

    return demand;
  };

  const getBadgeClass = () => {
    const text = decision.toLowerCase();

    if (text.includes("go")) return "success";

    if (text.includes("caution"))
      return "warning";

    return "danger";
  };

  return (
    <section className="dashboard">

      <div className="dashboard-header">

        <h2>AI Business Health Dashboard</h2>

        <p>
          AI-powered snapshot of your business performance.
        </p>

      </div>

      {/* KPI Cards */}

      <div className="dashboard-grid">

        {/* Score */}

        <div className="dashboard-card score-card">

          <div className="score-circle">

            <CircularProgressbar
              value={score}
              text={`${score}%`}
              styles={buildStyles({
                pathColor: "#ffffff",
                trailColor: "rgba(255,255,255,.25)",
                textColor: "#312e81",
                textSize: "18px",
              })}
            />

          </div>

          <h3>Business Score</h3>

        </div>

       

        {/* Risk */}

        <div className="dashboard-card">

          <div className="icon orange">

            <FaShieldAlt />

          </div>

          <h2>{risk}</h2>

          <p>Risk Level</p>

        </div>

        {/* Profit */}

        <div className="dashboard-card">

          <div className="icon green">

            <FaMoneyBillWave />

          </div>

          <h2>{margin}</h2>

          <p>Profit Margin</p>

        </div>

      </div>

      {/* Progress */}

      <div className="health-section">

        <div className="health-header">

          <span>Overall Business Health</span>

          <span>{score}%</span>

        </div>

        <div className="health-bar">

          <div
            className="health-fill"
            style={{ width: `${score}%` }}
          ></div>

        </div>

      </div>

      {/* Recommendation */}

      <div className="recommendation-card">

        <div className="recommendation-top">

          <div className="recommendation-title">

            <FaCheckCircle />

            <h3>AI Recommendation</h3>

          </div>

          <span className={`badge ${getBadgeClass()}`}>
            {decision}
          </span>

        </div>

        <p>{reason}</p>

      </div>

    </section>
  );
}

export default BusinessDashboard;