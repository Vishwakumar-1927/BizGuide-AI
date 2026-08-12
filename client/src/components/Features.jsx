import "./Features.css";
import {
  FaChartLine,
  FaMapMarkedAlt,
  FaMoneyBillWave,
  FaUsers,
  FaFileAlt,
  FaRocket,
  FaArrowRight,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaChartLine />,
      title: "Market Analysis",
      desc: "Understand market demand and identify profitable business opportunities with AI.",
    },
    {
      icon: <FaMapMarkedAlt />,
      title: "Location Intelligence",
      desc: "Discover the best location for your business using smart location analysis.",
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Investment Planning",
      desc: "Estimate startup costs, expected profits, and return on investment.",
    },
    {
      icon: <FaUsers />,
      title: "Competitor Analysis",
      desc: "Analyze competitors and understand market positioning before launching.",
    },
    {
      icon: <FaFileAlt />,
      title: "Business Reports",
      desc: "Generate AI-powered reports with actionable insights and recommendations.",
    },
    {
      icon: <FaRocket />,
      title: "Growth Strategy",
      desc: "Receive personalized suggestions to scale and grow your business faster.",
    },
  ];

  return (
    <section className="features">

      <div className="feature-heading">
        <span>FEATURES</span>

        <h2>Powerful AI Features</h2>

        <p>
          Everything you need to validate, plan, launch, and grow your business.
        </p>
      </div>

      <div className="feature-grid">

        {features.map((feature, index) => (

          <div className="feature-card" key={index}>

            <div className="feature-icon">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.desc}</p>

            <button className="feature-btn">
              Learn More
              <FaArrowRight />
            </button>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Features;