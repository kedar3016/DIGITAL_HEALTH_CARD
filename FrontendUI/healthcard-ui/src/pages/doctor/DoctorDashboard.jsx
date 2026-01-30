import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { logout } from "../../auth/roleGuard";
import {
  FaUserMd,
  FaSearch,
  FaFileMedical,
  FaDownload,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import ConfirmationModal from "../../components/ConfirmationModal";

export default function DoctorDashboard() {
  const [doctor, setDoctor] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [searchedPatient, setSearchedPatient] = useState(null);
  const [patientReports, setPatientReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false); // Add search loading state
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  /* New State for Upload */
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const navigate = useNavigate();

  /* New State for Access */
  const [accessStatus, setAccessStatus] = useState("NOT_REQUESTED"); // NOT_REQUESTED, PENDING, APPROVED, DENIED
  const [requestLoading, setRequestLoading] = useState(false);

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/doctors/me");
        setDoctor(res.data);
      } catch (err) {
        console.error("Failed to load doctor profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctorProfile();
  }, []);

  const handleSearchPatient = async () => {
    if (!searchId.trim()) {
      setError("Please enter a Health Card Number");
      return;
    }

    setSearchLoading(true);
    setError("");
    setSearchedPatient(null);
    setPatientReports([]);
    setAccessStatus("NOT_REQUESTED"); // Reset status

    try {
      // 1. Search Patient
      const patientRes = await api.get(`/api/Patients/readonly/${searchId}`);
      setSearchedPatient(patientRes.data);

      // 2. Check Access Status
      try {
        const accessRes = await api.get(`/api/access/status/${patientRes.data.id}`);
        setAccessStatus(accessRes.data.status); // PENDING, APPROVED, DENIED

        if (accessRes.data.status === "APPROVED") {
          // 3. Fetch Reports for this patient ONLY if APPROVED
          const reportsRes = await api.get(`/api/reports?healthCardId=${searchId}`);
          setPatientReports(reportsRes.data.map(r => ({
            id: r.id,
            name: r.reportName,
            date: new Date(r.uploadedAt).toLocaleDateString("en-GB", {
              day: "numeric", month: "short", year: "numeric"
            }),
            filePath: r.filePath,
            uploadedBy: r.uploadedBy
          })));
        }
      } catch (accessErr) {
        console.error("Failed to check access", accessErr);
        // If 404 or other error, assume NOT_REQUESTED
      }

    } catch (err) {
      console.error("Search failed", err);
      setError("Patient not found or multiple records exist.");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleRequestAccess = async () => {
    if (!searchedPatient) return;
    setRequestLoading(true);
    try {
      await api.post("/api/access/request", { patientId: searchedPatient.id });
      setAccessStatus("PENDING");
      alert("Access request sent!");
    } catch (e) {
      console.error("Request failed", e);
      alert("Failed to send request.");
    } finally {
      setRequestLoading(false);
    }
  };

  const performLogout = () => {
    logout();
    navigate("/");
  }

  const handleUploadPrescription = async () => {
    if (!searchedPatient || !prescriptionFile || !searchId) return;

    setUploadLoading(true);
    setUploadMessage("");

    const formData = new FormData();
    formData.append("file", prescriptionFile);

    try {
      // Use shared endpoint: /api/reports/upload/{healthCardId}
      await api.post(`/api/reports/upload/${searchId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadMessage("✅ Prescription uploaded successfully!");
      setPrescriptionFile(null);

      // Refresh reports to show the new prescription
      handleSearchPatient();

      // Clear message after 3 seconds
      setTimeout(() => setUploadMessage(""), 3000);

    } catch (err) {
      console.error("Upload failed", err);
      // Handle Access Denied specifically
      if (err.response && err.response.status === 403) {
        setUploadMessage("❌ Access Denied. You need approval.");
      } else {
        setUploadMessage("❌ Failed to upload prescription.");
      }
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {/* LOGO */}
          <div style={{
            width: "40px", height: "40px", background: "white", borderRadius: "10px",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#5654ff", fontSize: "22px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}>
            🏥
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "800", letterSpacing: "0.5px", lineHeight: "1.2" }}>AarogyaCard</h1>
            <span style={{ fontSize: "12px", opacity: 0.9, fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px" }}>Doctor Dashboard</span>
          </div>
        </div>

        {/* PROFILE DROPDOWN */}
        <div style={{ position: "relative" }}>
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              background: "rgba(255,255,255,0.2)",
              padding: "5px",
              borderRadius: "50%",
              transition: "background 0.2s"
            }}
          >
            <FaUserMd size={24} color="white" />
          </div>

          {showDropdown && (
            <div style={styles.dropdownMenu}>
              <div style={styles.dropdownHeader}>
                <div style={styles.dropdownAvatar}>
                  <FaUserMd color="#5654ff" size={16} />
                </div>
                <div>
                  <span style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#333" }}>
                    {doctor ? doctor.name : "Doctor"}
                  </span>
                  <span style={{ fontSize: "11px", color: "#888" }}>{doctor?.specialization || "General"}</span>
                </div>
              </div>
              <div style={styles.dropdownDivider}></div>
              <button onClick={() => setShowLogoutConfirm(true)} style={styles.dropdownItem}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={styles.container}>
        {/* SEARCH SECTION */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>
            <FaSearch /> Patient Search
          </h3>
          <div style={{ display: "flex", gap: "15px" }}>
            <input
              type="text"
              placeholder="Enter Patient Health Card Number"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              style={styles.searchInput}
            />
            <button
              onClick={handleSearchPatient}
              disabled={searchLoading}
              style={styles.primaryBtn}
            >
              {searchLoading ? "Searching..." : "Search"}
            </button>
          </div>
          {error && <p style={{ color: "red", marginTop: "10px", fontSize: "14px" }}>{error}</p>}
        </div>

        {/* PATIENT DETAILS & REPORTS */}
        {searchedPatient && (
          <div style={styles.grid}>
            {/* PATIENT INFO CARD */}
            <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>
                  <FaUser /> Patient Profile
                </h3>
                <div style={styles.profileDetails}>
                  <div style={styles.detailRow}>
                    <span style={styles.label}>Name</span>
                    <span style={styles.value}>{searchedPatient.name}</span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.label}>Age</span>
                    <span style={styles.value}>
                      {searchedPatient.dateOfBirth
                        ? `${new Date().getFullYear() - new Date(searchedPatient.dateOfBirth).getFullYear()} Years`
                        : "N/A"}
                    </span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.label}>Gender</span>
                    <span style={styles.value}>{searchedPatient.gender}</span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.label}>Blood Group</span>
                    <span style={styles.valueHighlight}>{searchedPatient.bloodGroup || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ACCESS CONTROL UI */}
            {accessStatus === "APPROVED" ? (
              // ✅ APPROVED: Show Reports & Upload
              <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>

                {/* UPLOAD PRESCRIPTION CARD */}
                <div style={styles.card}>
                  <h3 style={styles.cardTitle}>
                    <FaFileMedical /> Upload Prescription
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
                      Upload a digital prescription for <strong>{searchedPatient.name}</strong>.
                    </p>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => setPrescriptionFile(e.target.files[0])}
                        style={{
                          padding: "10px",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                          flex: 1,
                          fontSize: "14px"
                        }}
                      />
                      <button
                        onClick={handleUploadPrescription}
                        disabled={!prescriptionFile || uploadLoading}
                        style={{
                          ...styles.primaryBtn,
                          background: !prescriptionFile || uploadLoading ? "#cbd5e1" : "linear-gradient(90deg, #5654ff 0%, #764ba2 100%)",
                          cursor: !prescriptionFile || uploadLoading ? "not-allowed" : "pointer"
                        }}
                      >
                        {uploadLoading ? "Uploading..." : "Upload PDF"}
                      </button>
                    </div>
                    {uploadMessage && (
                      <p style={{
                        fontSize: "13px",
                        color: uploadMessage.includes("success") ? "green" : "red",
                        fontWeight: "600",
                        margin: 0
                      }}>
                        {uploadMessage}
                      </p>
                    )}
                  </div>
                </div>

                {/* REPORTS CARD */}
                <div style={styles.card}>
                  <h3 style={styles.cardTitle}>
                    <FaFileMedical /> Medical Reports
                  </h3>
                  {patientReports.length === 0 ? (
                    <p style={{ color: "#777", fontStyle: "italic" }}>No reports found for this patient.</p>
                  ) : (
                    <div style={styles.reportsList}>
                      {patientReports.map((report) => (
                        <div key={report.id} style={styles.reportItem}>
                          <div>
                            <strong>{report.name}</strong>
                            <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                              {report.date} • Uploaded by {report.uploadedBy || "Unknown"}
                            </div>
                          </div>
                          <button
                            style={styles.downloadBtn}
                            onClick={async () => {
                              try {
                                const api = (await import("../../api/axios")).default;
                                await api.post("/api/audit/log-view", {
                                  reportId: report.id,
                                  patientId: searchedPatient.id
                                });
                              } catch (e) { console.error("Log view failed", e); }
                              window.open(`http://localhost:5133${report.filePath}`, "_blank");
                            }}
                          >
                            <FaDownload /> View
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // 🔒 BLOCKED: Show Request Access Button
              <div style={{ ...styles.card, textAlign: "center", padding: "50px 20px" }}>
                <div style={{ fontSize: "40px", marginBottom: "20px" }}>🔒</div>
                <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>Access Restricted</h2>
                <p style={{ color: "#666", maxWidth: "400px", margin: "0 auto 20px" }}>
                  You need permission to access <strong>{searchedPatient.name}</strong>'s medical records.
                </p>

                {accessStatus === "PENDING" ? (
                  <div style={{
                    background: "#fef3c7", color: "#d97706", padding: "12px 20px",
                    borderRadius: "8px", display: "inline-block", fontWeight: "600"
                  }}>
                    ⏳ Request Pending...
                  </div>
                ) : accessStatus === "DENIED" ? (
                  <div style={{
                    background: "#fee2e2", color: "#ef4444", padding: "12px 20px",
                    borderRadius: "8px", display: "inline-block", fontWeight: "600"
                  }}>
                    ❌ Access Denied
                  </div>
                ) : (
                  <button
                    onClick={handleRequestAccess}
                    disabled={requestLoading}
                    style={{
                      ...styles.primaryBtn,
                      fontSize: "16px",
                      padding: "12px 30px",
                      background: "linear-gradient(90deg, #10b981 0%, #059669 100%)"
                    }}
                  >
                    {requestLoading ? "Sending..." : "Request Access"}
                  </button>
                )}
              </div>
            )}


          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={showLogoutConfirm}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={performLogout}
        onCancel={() => setShowLogoutConfirm(false)}
        type="danger"
      />
    </div >
  );
}

/* ===================== INLINE STYLES ===================== */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#ffffff",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    color: "#334155",
  },
  header: {
    background: "linear-gradient(90deg, #5654ff 0%, #764ba2 100%)",
    color: "#fff",
    padding: "15px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 10px rgba(86, 84, 255, 0.3)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  container: {
    maxWidth: "1000px",
    margin: "30px auto",
    padding: "0 20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
    marginTop: "30px",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    border: "1px solid #f1f5f9",
  },
  cardTitle: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
    color: "#333",
    fontSize: "18px",
    fontWeight: "700",
    borderBottom: "2px solid #f1f5f9",
    paddingBottom: "10px",
  },
  searchInput: {
    flex: 1,
    padding: "12px 15px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.2s",
  },
  primaryBtn: {
    background: "linear-gradient(90deg, #5654ff 0%, #764ba2 100%)",
    color: "#fff",
    border: "none",
    padding: "0 25px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  profileDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px dashed #e2e8f0",
    paddingBottom: "8px",
  },
  label: {
    fontSize: "13px",
    color: "#64748b",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  value: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1e293b",
  },
  valueHighlight: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#5654ff",
  },
  reportsList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  reportItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#f8fafc",
    padding: "15px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
  },
  downloadBtn: {
    background: "white",
    border: "1px solid #5654ff",
    color: "#5654ff",
    padding: "6px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  // Dropdown
  dropdownMenu: {
    position: "absolute",
    top: "50px",
    right: 0,
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    width: "220px",
    overflow: "hidden",
    zIndex: 101,
  },
  dropdownHeader: {
    padding: "15px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "#f8fafc",
  },
  dropdownAvatar: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    background: "#e0e7ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownDivider: {
    height: "1px",
    background: "#e2e8f0",
  },
  dropdownItem: {
    width: "100%",
    padding: "12px 15px",
    background: "white",
    border: "none",
    color: "#ef4444",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textAlign: "left",
  },
};