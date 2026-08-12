import "./HowItWorks.css";
import {
  FaLightbulb,
  FaRobot,
  FaFileInvoice,
  FaRocket,
} from "react-icons/fa";

function HowItWorks() {
  const steps = [
    {
      icon: <FaLightbulb />,
      title: "Business Idea",
      desc: "Enter your business idea, category, budget, and location.",
    },
    {
      icon: <FaRobot />,
      title: "AI Analysis",
      desc: "BizGuide AI analyzes market demand, competition, and investment.",
    },
    {
      icon: <FaFileInvoice />,
      title: "Business Report",
      desc: "Receive a detailed AI-generated report with recommendations.",
    },
    {
      icon: <FaRocket />,
      title: "Launch Business",
      desc: "Use the report to confidently start and grow your business.",
    },
  ];

  return (
    <section className="how">

      <div className="how-heading">

        <span>HOW IT WORKS</span>

        <h2>Start Your Business In Four Simple Steps</h2>

        <p>
          From idea validation to launch, BizGuide AI guides you through every step.
        </p>

      </div>

      <div className="timeline">

        {steps.map((step, index) => (

          <div className="timeline-card" key={index}>

            <div className="circle">

              {step.icon}

            </div>

            <h3>{step.title}</h3>

            <p>{step.desc}</p>

            {index !== steps.length - 1 && (
              <div className="connector"></div>
            )}

          </div>

        ))}

      </div>

    </section>
  );
}

export default HowItWorks;