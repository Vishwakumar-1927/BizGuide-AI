import "./ReportActions.css";
import { useNavigate } from "react-router-dom";

function ReportActions() {

  const navigate = useNavigate();

  const printReport = () => {
    window.print();
  };

  return (
    <div className="report-actions">

      <button
        className="primary-action"
        onClick={printReport}
      >
        🖨 Print Report
      </button>

      <button
        className="secondary-action"
        onClick={() => navigate("/analyze")}
      >
        🔄 Analyze Another Business
      </button>

    </div>
  );
}

export default ReportActions;