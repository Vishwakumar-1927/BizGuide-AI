import "./InvestmentAnalysis.css";

function InvestmentAnalysis({ report }) {

  if (!report) return null;

  return (
    <div className="investment-card">

      <h2>💰 Investment Analysis</h2>

      <p>{report.investmentAnalysis}</p>

    </div>
  );
}

export default InvestmentAnalysis;