import "./FinancialAnalysis.css";

import {
  FaMoneyBillWave,
  FaChartLine,
  FaWallet,
  FaPercentage,
  FaClock,
  FaCoins,
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

  const financialItems = [
    {
      icon: <FaMoneyBillWave />,
      label: "INVESTMENT",
      title: "Investment Analysis",
      value: investmentAnalysis,
      className: "investment",
    },
    {
      icon: <FaChartLine />,
      label: "REVENUE",
      title: "Estimated Revenue",
      value: estimatedRevenue,
      className: "revenue",
    },
    {
      icon: <FaWallet />,
      label: "PROFIT",
      title: "Estimated Profit",
      value: estimatedProfit,
      className: "profit",
    },
    {
      icon: <FaPercentage />,
      label: "MARGIN",
      title: "Profit Margin",
      value: profitMargin,
      className: "margin",
    },
    {
      icon: <FaClock />,
      label: "RECOVERY",
      title: "Break-even Period",
      value: breakEvenPeriod,
      className: "break-even",
    },
  ];

  return (
    <section className="financial-section">

      {/* HEADER */}

      <div className="financial-header">

        <div className="financial-title">

          <div className="financial-title-icon">
            <FaCoins />
          </div>

          <div>
            <span>FINANCIAL INTELLIGENCE</span>

            <h2>Financial Analysis</h2>

            <p>
              AI-generated projections for investment, revenue,
              profitability, and capital recovery.
            </p>
          </div>

        </div>

      </div>


      {/* FINANCIAL GRID */}

      <div className="financial-grid">

        {financialItems.map((item, index) => (

          <div
            className={`financial-card ${item.className}`}
            key={index}
          >

            <div className="financial-card-top">

              <div className="financial-icon">
                {item.icon}
              </div>

            </div>

            <span className="financial-label">
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

export default FinancialAnalysis;