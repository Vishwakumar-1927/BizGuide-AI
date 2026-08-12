import "./Recommendations.css";
import {
  FaBullhorn,
  FaCogs,
  FaWallet,
} from "react-icons/fa";

function Recommendations({ report }) {

  if (!report?.recommendations) return null;

  const {
    marketing = [],
    operations = [],
    financial = [],
  } = report.recommendations;

  const renderList = (items) => {

    if (!items.length)
      return <li>No recommendations available.</li>;

    return items.map((item, index) => (
      <li key={index}>{item}</li>
    ));

  };

  return (

    <section className="recommend-section">

      <div className="recommend-header">

        <h2>Business Recommendations</h2>

        <p>
          AI-generated recommendations to improve business growth,
          operational efficiency, and financial stability.
        </p>

      </div>

      <div className="recommend-grid">

        <div className="recommend-card marketing">

          <div className="recommend-title">

            <FaBullhorn />

            <h3>Marketing</h3>

          </div>

          <ul>
            {renderList(marketing)}
          </ul>

        </div>

        <div className="recommend-card operations">

          <div className="recommend-title">

            <FaCogs />

            <h3>Operations</h3>

          </div>

          <ul>
            {renderList(operations)}
          </ul>

        </div>

        <div className="recommend-card financial">

          <div className="recommend-title">

            <FaWallet />

            <h3>Financial</h3>

          </div>

          <ul>
            {renderList(financial)}
          </ul>

        </div>

      </div>

    </section>

  );

}

export default Recommendations;