import "./Analyze.css";

import AnalyzeForm from "../components/AnalyzeForm";
import AnalysisInfo from "../components/AnalysisInfo";


function Analyze() {
  return (
    <section className="analyze-page">

      <div className="analyze-hero">

        <span className="hero-badge">
          🚀 AI Powered Business Analysis
        </span>

        <h1>
          Analyze Your Business
          <span> With AI</span>
        </h1>

        <p>
          Enter your business details and let BizGuide AI analyze
          market demand, competition, investment, profitability,
          and provide intelligent recommendations within seconds.
        </p>

      </div>

      <div className="analyze-wrapper">

        <AnalyzeForm />

        <AnalysisInfo />

      </div>

    </section>
  );
}

export default Analyze;