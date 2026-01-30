import { Link } from "react-router-dom";

export default function DownloadHealthCard() {
  const download = () => {
    window.open(
      "http://localhost:5133/api/patients/health-card",
      "_blank"
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/patient/dashboard">← Back to Dashboard</Link>
      <h2>Smart Health Card</h2>
      <p>Download your comprehensive health card in PDF format.</p>
      <button
        onClick={download}
        style={{ padding: "10px 20px", backgroundColor: "#012c63", color: "white", border: "none", borderRadius: "5px" }}
      >
        Download PDF
      </button>
    </div>
  );
}
