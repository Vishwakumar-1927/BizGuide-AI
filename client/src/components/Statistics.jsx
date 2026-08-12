import "./Statistics.css";
import {
  FaChartLine,
  FaBriefcase,
  FaBullseye,
  FaHeadset,
} from "react-icons/fa";

function Statistics() {
  const stats = [
    {
      icon: <FaChartLine />,
      number: "1500+",
      title: "Business Reports",
    },
    {
      icon: <FaBriefcase />,
      number: "20+",
      title: "Business Categories",
    },
    {
      icon: <FaBullseye />,
      number: "95%",
      title: "AI Accuracy",
    },
    {
      icon: <FaHeadset />,
      number: "24/7",
      title: "Support",
    },
  ];

  return (
    <section className="statistics">

      <div className="statistics-header">

        <span>OUR IMPACT</span>

        <h2>Helping Entrepreneurs Every Day</h2>

        <p>
          Thousands of entrepreneurs trust BizGuide AI to analyze,
          validate and improve their business ideas.
        </p>

      </div>

      <div className="stats-grid">

        {stats.map((item, index) => (

          <div className="stat-card" key={index}>

            <div className="stat-icon">

              {item.icon}

            </div>

            <h2>{item.number}</h2>

            <p>{item.title}</p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Statistics;