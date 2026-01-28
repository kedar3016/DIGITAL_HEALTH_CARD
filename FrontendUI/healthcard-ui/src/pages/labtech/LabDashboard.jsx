import { useState } from "react";
import { logout } from "../../auth/roleGuard";
import api from "../../api/axios";

export default function LabDashboard() {
  const [searchId, setSearchId] = useState("");
  const [patient, setPatient] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const searchPatient = async () => {
    if (!searchId.trim()) {
      setMessage("Please enter a patient ID");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await api.get(`/api/patients/${searchId}`);
      setPatient(res.data);
      setMessage("Patient found successfully");
    } catch (err) {
      console.error("Patient search failed", err);
      setMessage(err.response?.data?.message || "Patient not found");
      setPatient(null);
    } finally {
      setLoading(false);
    }
  };

  const uploadReport = async () => {
    if (!patient || !file) {
      setMessage("Please search for a patient and select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("report", file);
    formData.append("patientId", patient.id);

    setLoading(true);
    setMessage("");

    try {
      await api.post("/api/lab/reports/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Report uploaded successfully");
      setFile(null);
      setPatient(null);
      setSearchId("");
    } catch (err) {
      console.error("Report upload failed", err);
      setMessage(err.response?.data?.message || "Report upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setMessage("");
    } else {
      setMessage("Please select a valid PDF file");
      setFile(null);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      padding: "20px",
      fontFamily: "'Inter', system-ui, sans-serif"
    }}>
      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        background: "white",
        borderRadius: "16px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        padding: "40px"
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{
            color: "#2d3748",
            fontSize: "32px",
            fontWeight: "700",
            margin: "0 0 8px 0"
          }}>
            🧪 Lab Technician Dashboard
          </h1>
          <p style={{
            color: "#718096",
            fontSize: "16px",
            margin: "0"
          }}>
            Manage patient reports and upload test results
          </p>
        </div>

        {/* Navigation */}
        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: "30px",
          padding: "20px",
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          borderRadius: "12px",
          color: "white"
        }}>
          <button
            onClick={logout}
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "white",
              border: "1px solid white",
              padding: "8px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            Logout
          </button>
        </div>

        {/* Message */}
        {message && (
          <div style={{
            backgroundColor: message.includes("success") ? "#d4edda" : "#f8d7da",
            color: message.includes("success") ? "#155724" : "#721c24",
            padding: "12px 16px",
            borderRadius: "8px",
            marginBottom: "20px",
            border: `1px solid ${message.includes("success") ? "#c3e6cb" : "#f5c6cb"}`,
            fontSize: "14px"
          }}>
            {message}
          </div>
        )}

        {/* Search Section */}
        <div style={{
          background: "#f8f9fa",
          padding: "24px",
          borderRadius: "12px",
          marginBottom: "24px"
        }}>
          <h3 style={{
            color: "#2d3748",
            fontSize: "20px",
            fontWeight: "600",
            margin: "0 0 16px 0"
          }}>
            🔍 Search Patient
          </h3>
          <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
            <input
              type="text"
              placeholder="Enter Patient ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              style={{
                flex: 1,
                padding: "12px 16px",
                border: "2px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "16px",
                outline: "none"
              }}
            />
            <button
              onClick={searchPatient}
              disabled={loading}
              style={{
                padding: "12px 24px",
                background: loading ? "#a0aec0" : "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {/* Patient Info */}
          {patient && (
            <div style={{
              background: "white",
              padding: "16px",
              borderRadius: "8px",
              border: "1px solid #e2e8f0"
            }}>
              <h4 style={{ margin: "0 0 8px 0", color: "#2d3748" }}>Patient Details</h4>
              <p style={{ margin: "4px 0", color: "#4a5568" }}><strong>Name:</strong> {patient.name}</p>
              <p style={{ margin: "4px 0", color: "#4a5568" }}><strong>Email:</strong> {patient.email}</p>
              <p style={{ margin: "4px 0", color: "#4a5568" }}><strong>Phone:</strong> {patient.phone}</p>
            </div>
          )}
        </div>

        {/* Upload Section */}
        {patient && (
          <div style={{
            background: "#f8f9fa",
            padding: "24px",
            borderRadius: "12px"
          }}>
            <h3 style={{
              color: "#2d3748",
              fontSize: "20px",
              fontWeight: "600",
              margin: "0 0 16px 0"
            }}>
              📄 Upload Report
            </h3>
            <div style={{ marginBottom: "16px" }}>
              <label style={{
                display: "block",
                color: "#4a5568",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "6px"
              }}>
                Select PDF Report
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "16px"
                }}
              />
            </div>
            {file && (
              <p style={{ margin: "8px 0", color: "#4a5568" }}>
                Selected file: <strong>{file.name}</strong>
              </p>
            )}
            <button
              onClick={uploadReport}
              disabled={loading || !file}
              style={{
                width: "100%",
                padding: "14px 20px",
                background: loading || !file ? "#a0aec0" : "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: loading || !file ? "not-allowed" : "pointer"
              }}
            >
              {loading ? "Uploading..." : "Upload Report"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
