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

  const riskItems = [
    {
      icon: <FaMoneyBillWave />,
      title: "Financial Risk",
      value: financialRisk,
      className: "financial",
    },
    {
      icon: <FaChartLine />,
      title: "Market Risk",
      value: marketRisk,
      className: "market",
    },
    {
      icon: <FaCogs />,
      title: "Operational Risk",
      value: operationalRisk,
      className: "operational",
    },
    {
      icon: <FaBalanceScale />,
      title: "Legal Risk",
      value: legalRisk,
      className: "legal",
    },
  ];

  return (
    <section className="risk-section">

      {/* Header */}
      <div className="risk-header">

        <div className="risk-title">

          <div className="risk-title-icon">
            <FaShieldAlt />
          </div>

          <div>
            <span>RISK INTELLIGENCE</span>

            <h2>Risk Assessment</h2>

            <p>
              AI-powered evaluation of the key risks that may affect
              your business and its long-term stability.
            </p>
          </div>

        </div>

      </div>

      {/* Overall Risk */}
      <div className={`overall-risk ${getRiskClass(riskLevel)}`}>

        <div className="overall-risk-icon">
          <FaShieldAlt />
        </div>

        <div className="overall-risk-content">

          <span>OVERALL RISK LEVEL</span>

          <h3>{riskLevel || "Medium"}</h3>

          <p>
            Based on the combined financial, market, operational,
            and legal risk factors.
          </p>

        </div>

        <div className="risk-status">
          <span>AI ASSESSMENT</span>
          <strong>{riskLevel || "Medium"}</strong>
        </div>

      </div>

      {/* Risk Cards */}
      <div className="risk-grid">

        {riskItems.map((item, index) => (
          <div
            className={`risk-card ${item.className}`}
            key={index}
          >

            <div className="risk-card-top">

              <div className="risk-icon">
                {item.icon}
              </div>

              <span>
                RISK FACTOR
              </span>

            </div>

            <h3>{item.title}</h3>

            <p>
              {item.value || "No information available."}
            </p>

          </div>
        ))}

      </div>

      {/* AI Summary */}
      <div className="risk-summary">

        <div className="summary-icon">
          <FaShieldAlt />
        </div>

        <div className="summary-content">

          <span>AI INSIGHT</span>

          <h3>Risk Summary</h3>

          <p>
            {summary || "No risk summary available."}
          </p>

        </div>

      </div>

    </section>
  );
}

export default RiskAssessment;