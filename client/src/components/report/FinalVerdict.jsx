import "./FinalVerdict.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaRobot,
  FaChartLine,
} from "react-icons/fa";

function FinalVerdict({ report }) {
  if (!report?.finalVerdict) return null;

  const { businessScore, decision, reason } = report.finalVerdict;

  const getDecisionClass = () => {
    if (decision === "GO-AHEAD") return "go";
    if (decision === "PROCEED WITH CAUTION") return "caution";
    return "reject";
  };

  const getDecisionIcon = () => {
    if (decision === "GO-AHEAD")
      return <FaCheckCircle />;

    if (decision === "PROCEED WITH CAUTION")
      return <FaExclamationTriangle />;

    return <FaTimesCircle />;
  };

  return (
    <section className="verdict-section">

      <div className={`verdict-hero ${getDecisionClass()}`}>

        <div className="score-wrapper">

          <div className="score-circle">

            <CircularProgressbar
              value={businessScore}
              text={`${businessScore}`}
              styles={buildStyles({
                pathColor: "#fff",
                textColor: "#fff",
                trailColor: "rgba(255,255,255,.2)",
                textSize: "18px",
              })}
            />

          </div>

          <h3>Business Score</h3>

        </div>

        <div className="verdict-info">

          <div className="decision">

            {getDecisionIcon()}

            <h2>{decision}</h2>

          </div>

          <p>
            {reason}
          </p>

        </div>

      </div>

      {/* Score Breakdown */}

      <div className="breakdown-card">

        <h2>

          <FaChartLine />

          AI Score Breakdown

        </h2>

        <div className="progress-item">

          <span>Business Score</span>

          <span>{businessScore}%</span>

        </div>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{ width: `${businessScore}%` }}
          />

        </div>

      </div>

      {/* AI Summary */}

      <div className="ai-summary">

        <div className="summary-title">

          <FaRobot />

          <h2>AI Final Recommendation</h2>

        </div>

        <p>

          After analyzing the market demand, competition,
          financial projections, SWOT analysis, and business
          risks, BizGuide AI concludes that:

        </p>

        <blockquote>

          "{reason}"

        </blockquote>

      </div>

    </section>
  );
}

export default FinalVerdict;