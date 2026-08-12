import "./RisksRecommendations.css";

function RisksRecommendations({ report }) {

  if (!report) return null;

  return (
    <div className="rr-grid">

      <div className="rr-card">

        <h2>⚠ Risks</h2>

        <ul>
          {report.risks?.map((risk,index)=>(
            <li key={index}>{risk}</li>
          ))}
        </ul>

      </div>

      <div className="rr-card">

        <h2>🚀 Recommendations</h2>

        <ul>
          {report.recommendations?.map((item,index)=>(
            <li key={index}>{item}</li>
          ))}
        </ul>

      </div>

    </div>
  );
}

export default RisksRecommendations;