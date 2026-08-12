import "./InsightCards.css";

function InsightCards({ report }) {
  return (
    <div className="insight-grid">

      <div className="insight-card">
        <h3>📈 Market Demand</h3>
        <p>{report.marketDemand}</p>
      </div>

      <div className="insight-card">
        <h3>⭐ Business Score</h3>
        <p>{report.businessScore}</p>
      </div>

      <div className="insight-card">
        <h3>⚔ Competition</h3>
        <p>{report.competition}</p>
      </div>

      <div className="insight-card">
        <h3>💰 Expected Profit</h3>
        <p>{report.expectedProfit}</p>
      </div>

    </div>
  );
}

export default InsightCards;