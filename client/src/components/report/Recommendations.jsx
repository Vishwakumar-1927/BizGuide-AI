import "./Recommendations.css";
import {
  FaBullhorn,
  FaCogs,
  FaWallet,
  FaLightbulb,
} from "react-icons/fa";

function Recommendations({ report }) {
  if (!report?.recommendations) return null;

  const {
    marketing = [],
    operations = [],
    financial = [],
  } = report.recommendations;

  const renderList = (items) => {
    if (!items.length) {
      return <li>No recommendations available.</li>;
    }

    return items.map((item, index) => (
      <li key={index}>
        <span className="recommend-number">
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className="recommend-text">
          {item}
        </span>
      </li>
    ));
  };

  const recommendationItems = [
    {
      icon: <FaBullhorn />,
      label: "GROWTH",
      title: "Marketing",
      items: marketing,
      className: "marketing",
    },
    {
      icon: <FaCogs />,
      label: "EFFICIENCY",
      title: "Operations",
      items: operations,
      className: "operations",
    },
    {
      icon: <FaWallet />,
      label: "PROFITABILITY",
      title: "Financial",
      items: financial,
      className: "financial",
    },
  ];

  return (
    <section className="recommend-section">

      {/* Header */}
      <div className="recommend-header">

        <div className="recommend-title">

          <div className="recommend-header-icon">
            <FaLightbulb />
          </div>

          <div>
            <span>AI STRATEGY</span>

            <h2>Business Recommendations</h2>

            <p>
              AI-generated strategies designed to improve growth,
              operational efficiency, and financial performance.
            </p>
          </div>

        </div>

      </div>

      {/* Recommendation Cards */}
      <div className="recommend-grid">

        {recommendationItems.map((item, index) => (
          <div
            className={`recommend-card ${item.className}`}
            key={index}
          >

            <div className="recommend-card-top">

              <div className="recommend-icon">
                {item.icon}
              </div>

              <span>{item.label}</span>

            </div>

            <h3>{item.title}</h3>

            <ul>
              {renderList(item.items)}
            </ul>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Recommendations;