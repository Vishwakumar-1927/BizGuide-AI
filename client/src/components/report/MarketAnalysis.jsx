import "./MarketAnalysis.css";

import {
  FaChartLine,
  FaUsers,
  FaMapMarkerAlt,
  FaTrophy,
  FaArrowUp,
} from "react-icons/fa";

function MarketAnalysis({ report }) {
  if (!report?.marketAnalysis) return null;

  const {
    marketDemand,
    competition,
    targetCustomers,
    bestLocation,
  } = report.marketAnalysis;

  const marketItems = [
    {
      icon: <FaChartLine />,
      label: "MARKET DEMAND",
      title: "Market Demand",
      value: marketDemand,
      className: "demand",
    },
    {
      icon: <FaTrophy />,
      label: "COMPETITION",
      title: "Competition",
      value: competition,
      className: "competition",
    },
    {
      icon: <FaUsers />,
      label: "CUSTOMER SEGMENT",
      title: "Target Customers",
      value: targetCustomers,
      className: "customers",
    },
    {
      icon: <FaMapMarkerAlt />,
      label: "LOCATION",
      title: "Best Location",
      value: bestLocation,
      className: "location",
    },
  ];

  return (
    <section className="market-section">

      {/* HEADER */}

      <div className="market-header">

        <div className="market-title">

          <div className="market-title-icon">
            <FaChartLine />
          </div>

          <div>
            <span>MARKET INTELLIGENCE</span>

            <h2>Market Analysis</h2>

            <p>
              AI-generated insights into demand, competition,
              customers, and location opportunities.
            </p>
          </div>

        </div>

      </div>


      {/* MARKET CARDS */}

      <div className="market-grid">

        {marketItems.map((item, index) => (

          <div
            className={`market-card ${item.className}`}
            key={index}
          >

            <div className="market-card-top">

              <div className="market-icon">
                {item.icon}
              </div>

              <FaArrowUp className="market-arrow" />

            </div>

            <span className="market-label">
              {item.label}
            </span>

            <h3>
              {item.title}
            </h3>

            <p>
              {item.value || "No information available."}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default MarketAnalysis;