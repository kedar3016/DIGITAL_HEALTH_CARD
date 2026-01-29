import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function PatientReports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    api.get("/api/reports")
      .then(res => setReports(res.data))
      .catch(() => alert("Failed to load reports"));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/patient/dashboard">← Back to Dashboard</Link>
      <h2>Medical Reports</h2>

      <div style={{ marginTop: "20px" }}>
        {reports.length === 0 ? (
          <p>No reports available.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {reports.map(r => (
              <li key={r.id} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
                <strong>{r.reportName}</strong> – Uploaded by {r.uploadedBy}
                <br />
                <a href={`http://localhost:5133${r.filePath}`} target="_blank" rel="noopener noreferrer">
                  View PDF
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
