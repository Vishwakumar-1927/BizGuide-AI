import "./RiskAssessment.css";
import {
  FaShieldAlt,
  FaMoneyBillWave,
  FaChartLine,
  FaCogs,
  FaBalanceScale,
} from "react-icons/fa";

function RiskAssessment({ report }) {
  if (!report?.riskAssessment) return null;

  const {
    riskLevel,
    financialRisk,
    marketRisk,
    operationalRisk,
    legalRisk,
    summary,
  } = report.riskAssessment;

  const getRiskClass = (level = "") => {
    const value = level.toLowerCase();

    if (value.includes("low")) return "low";
    if (value.includes("medium")) return "medium";
    if (value.includes("high")) return "high";

    return "medium";
  };

  return (
    <section className="risk-section">

      <div className="risk-header">
        <h2>Risk Assessment</h2>
        <p>
          AI evaluation of the key risks associated with your business.
        </p>
      </div>

      {/* Overall Risk */}

      <div className={`overall-risk ${getRiskClass(riskLevel)}`}>

        <div className="overall-left">
          <FaShieldAlt />
          <div>
            <h3>Overall Risk Level</h3>
            <p>{riskLevel}</p>
          </div>
        </div>

      </div>

      {/* Risk Cards */}

      <div className="risk-grid">

        <div className="risk-card">

          <div className="risk-icon blue">
            <FaMoneyBillWave />
          </div>

          <h3>Financial Risk</h3>

          <p>{financialRisk}</p>

        </div>

        <div className="risk-card">

          <div className="risk-icon orange">
            <FaChartLine />
          </div>

          <h3>Market Risk</h3>

          <p>{marketRisk}</p>

        </div>

        <div className="risk-card">

          <div className="risk-icon green">
            <FaCogs />
          </div>

          <h3>Operational Risk</h3>

          <p>{operationalRisk}</p>

        </div>

        <div className="risk-card">

          <div className="risk-icon purple">
            <FaBalanceScale />
          </div>

          <h3>Legal Risk</h3>

          <p>{legalRisk}</p>

        </div>

      </div>

      {/* AI Summary */}

      <div className="risk-summary">

        <h3>AI Risk Summary</h3>

        <p>{summary}</p>

      </div>

    </section>
  );
}

export default RiskAssessment;