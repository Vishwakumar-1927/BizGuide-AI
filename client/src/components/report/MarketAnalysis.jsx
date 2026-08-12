import "./MarketAnalysis.css";
import {
  FaChartLine,
  FaUsers,
  FaMapMarkerAlt,
  FaTrophy,
} from "react-icons/fa";

function MarketAnalysis({ report }) {
  if (!report?.marketAnalysis) return null;

  const {
    marketDemand,
    competition,
    targetCustomers,
    bestLocation,
  } = report.marketAnalysis;

  return (
    <section className="market-section">

      <div className="market-header">

        <h2>Market Analysis</h2>

        <p>
          AI-generated insights about demand, competition, customers and the
          most suitable business location.
        </p>

      </div>

      <div className="market-grid">

        <div className="market-card">

          <div className="market-icon blue">
            <FaChartLine />
          </div>

          <h3>Market Demand</h3>

          <p>{marketDemand}</p>

        </div>

        <div className="market-card">

          <div className="market-icon orange">
            <FaTrophy />
          </div>

          <h3>Competition</h3>

          <p>{competition}</p>

        </div>

        <div className="market-card">

          <div className="market-icon green">
            <FaUsers />
          </div>

          <h3>Target Customers</h3>

          <p>{targetCustomers}</p>

        </div>

        <div className="market-card">

          <div className="market-icon red">
            <FaMapMarkerAlt />
          </div>

          <h3>Best Location</h3>

          <p>{bestLocation}</p>

        </div>

      </div>

    </section>
  );
}

export default MarketAnalysis;