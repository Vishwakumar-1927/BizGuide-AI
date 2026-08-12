import "./SWOTAnalysis.css";
import {
  FaThumbsUp,
  FaExclamationTriangle,
  FaRocket,
  FaShieldAlt,
} from "react-icons/fa";

function SWOTAnalysis({ report }) {
  if (!report?.swotAnalysis) return null;

  const {
    strengths = [],
    weaknesses = [],
    opportunities = [],
    threats = [],
  } = report.swotAnalysis;

  const renderList = (items) => {
    if (!items.length) return <li>No information available.</li>;

    return items.map((item, index) => (
      <li key={index}>{item}</li>
    ));
  };

  return (
    <section className="swot-section">

      <div className="swot-header">
        <h2>SWOT Analysis</h2>

        <p>
          AI-generated strategic assessment highlighting the internal and
          external factors affecting your business.
        </p>
      </div>

      <div className="swot-grid">

        <div className="swot-card strengths">

          <div className="swot-title">
            <FaThumbsUp />
            <h3>Strengths</h3>
          </div>

          <ul>
            {renderList(strengths)}
          </ul>

        </div>

        <div className="swot-card weaknesses">

          <div className="swot-title">
            <FaExclamationTriangle />
            <h3>Weaknesses</h3>
          </div>

          <ul>
            {renderList(weaknesses)}
          </ul>

        </div>

        <div className="swot-card opportunities">

          <div className="swot-title">
            <FaRocket />
            <h3>Opportunities</h3>
          </div>

          <ul>
            {renderList(opportunities)}
          </ul>

        </div>

        <div className="swot-card threats">

          <div className="swot-title">
            <FaShieldAlt />
            <h3>Threats</h3>
          </div>

          <ul>
            {renderList(threats)}
          </ul>

        </div>

      </div>

    </section>
  );
}

export default SWOTAnalysis;