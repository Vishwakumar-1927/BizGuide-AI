import "./WhyChooseUs.css";

function WhyChooseUs() {

  const reasons = [
    {
      icon: "🤖",
      title: "AI-Powered Analysis",
      description:
        "Advanced AI analyzes your business idea using market trends and business intelligence."
    },
    {
      icon: "⚡",
      title: "Instant Reports",
      description:
        "Generate detailed business reports within seconds instead of spending hours researching."
    },
    {
      icon: "📍",
      title: "Smart Location Insights",
      description:
        "Identify the most suitable location based on customer demand and competition."
    },
    {
      icon: "📈",
      title: "Growth Recommendations",
      description:
        "Receive AI suggestions to improve profitability and long-term business growth."
    },
    {
      icon: "🔒",
      title: "Secure & Reliable",
      description:
        "Your business information remains secure with protected data handling."
    },
    {
      icon: "🌍",
      title: "Multiple Business Categories",
      description:
        "Supports startups, restaurants, medical shops, retail stores, IT businesses, and more."
    }
  ];

  return (
    <section className="why-section">

      <div className="section-header">

        <span className="section-badge">
          WHY CHOOSE US
        </span>

        <h2>Why Entrepreneurs Choose BizGuide AI</h2>

        <p>
          We combine Artificial Intelligence with business insights to help
          entrepreneurs make informed decisions before investing.
        </p>

      </div>

      <div className="why-grid">

        {reasons.map((item, index) => (

          <div className="why-card" key={index}>

            <div className="why-icon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p>{item.description}</p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default WhyChooseUs;