import "./FinancialAnalysis.css";
import {
  FaMoneyBillWave,
  FaChartLine,
  FaWallet,
  FaPercentage,
  FaClock,
} from "react-icons/fa";

function FinancialAnalysis({ report }) {
  if (!report?.financialAnalysis) return null;

  const {
    investmentAnalysis,
    estimatedRevenue,
    estimatedProfit,
    profitMargin,
    breakEvenPeriod,
  } = report.financialAnalysis;

  return (
    <section className="financial-section">

      <div className="financial-header">
        <h2>Financial Analysis</h2>

        <p>
          AI-generated financial projections including investment,
          revenue, profitability, and break-even estimation.
        </p>
      </div>

      <div className="financial-grid">

        <div className="financial-card">
          <div className="financial-icon blue">
            <FaMoneyBillWave />
          </div>

          <h3>Investment Analysis</h3>

          <p>{investmentAnalysis}</p>
        </div>

        <div className="financial-card">
          <div className="financial-icon green">
            <FaChartLine />
          </div>

          <h3>Estimated Revenue</h3>

          <p>{estimatedRevenue}</p>
        </div>

        <div className="financial-card">
          <div className="financial-icon orange">
            <FaWallet />
          </div>

          <h3>Estimated Profit</h3>

          <p>{estimatedProfit}</p>
        </div>

        <div className="financial-card">
          <div className="financial-icon purple">
            <FaPercentage />
          </div>

          <h3>Profit Margin</h3>

          <p>{profitMargin}</p>
        </div>

        <div className="financial-card full-width">
          <div className="financial-icon red">
            <FaClock />
          </div>

          <h3>Break-even Period</h3>

          <p>{breakEvenPeriod}</p>
        </div>

      </div>

    </section>
  );
}

export default FinancialAnalysis;