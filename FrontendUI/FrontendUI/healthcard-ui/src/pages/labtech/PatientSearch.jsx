import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function PatientSearch() {
  const [patientId, setPatientId] = useState("");
  const [patient, setPatient] = useState(null);

  const fetchPatient = async () => {
    try {
      const res = await api.get(`/api/patients/readonly/${patientId}`);
      setPatient(res.data);
    } catch (err) {
      console.error("Patient not found", err);
      setPatient(null);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/lab/dashboard">← Back to Dashboard</Link>
      <h2>Search Patient</h2>
      <input
        placeholder="Patient ID"
        value={patientId}
        onChange={e => setPatientId(e.target.value)}
        style={{ display: "block", margin: "10px 0", padding: "10px", width: "100%", maxWidth: "300px" }}
      />
      <button
        onClick={fetchPatient}
        style={{ padding: "10px", backgroundColor: "#007bff", color: "white", border: "none" }}
      >
        Search
      </button>

      {patient && (
        <div style={{ marginTop: "20px", padding: "20px", border: "1px solid #ccc", borderRadius: "5px" }}>
          <h3>Patient Details</h3>
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Blood Group:</strong> {patient.bloodGroup}</p>
          <p><strong>Date of Birth:</strong> {patient.dateOfBirth}</p>
          <Link to={`/lab/upload/${patientId}`} style={{ color: "#007bff" }}>Upload Report</Link>
        </div>
      )}
    </div>
  );
}
