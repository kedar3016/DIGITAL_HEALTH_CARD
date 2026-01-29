import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/axios";

export default function UploadReport() {
  const { patientId } = useParams();
  const [file, setFile] = useState(null);
  const [reportName, setReportName] = useState("");

  const upload = async () => {
    if (!file || !reportName) {
      alert("Please select a file and enter report name");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("reportName", reportName);

    try {
      await api.post(`/api/reports/upload/${patientId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("Report uploaded successfully");
      setFile(null);
      setReportName("");
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/lab/search">← Back to Search</Link>
      <h2>Upload Report for Patient {patientId}</h2>
      <input
        placeholder="Report Name"
        value={reportName}
        onChange={e => setReportName(e.target.value)}
        style={{ display: "block", margin: "10px 0", padding: "10px", width: "100%", maxWidth: "300px" }}
      />
      <input
        type="file"
        accept="application/pdf"
        onChange={e => setFile(e.target.files[0])}
        style={{ display: "block", margin: "10px 0" }}
      />
      <button
        onClick={upload}
        style={{ padding: "10px", backgroundColor: "#007bff", color: "white", border: "none" }}
      >
        Upload
      </button>
    </div>
  );
}
