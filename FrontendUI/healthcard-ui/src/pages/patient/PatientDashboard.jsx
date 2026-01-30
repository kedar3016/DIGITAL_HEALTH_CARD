import React, { useState } from "react";
import {
  FaUser,
  FaIdCard,
  FaFileMedical,
  FaDownload,
  FaSignOutAlt,
} from "react-icons/fa";
import ConfirmationModal from "../../components/ConfirmationModal";
import "./PatientDashboard.css";


export default function PatientDashboard() {
  const [patient, setPatient] = useState(null);
  const [reports, setReports] = useState([]); // Keeps reports mock for now or empty until next step
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState(""); // For custom toast messages
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown state
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // Logout confirmation modal state
  const fileInputRef = React.useRef(null);

  const fetchReports = async (api) => {
    const reportsRes = await api.get("/api/reports");
    setReports(reportsRes.data.map(r => ({
      id: r.id,
      name: r.reportName,
      date: new Date(r.uploadedAt).toLocaleDateString("en-GB", {
        day: "numeric", month: "short", year: "numeric"
      }),
      filePath: r.filePath
    })));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const api = (await import("../../api/axios")).default;
      await api.post("/api/reports/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Refresh list
      await fetchReports(api);

      setNotification("✅ Report uploaded successfully!");
      setTimeout(() => setNotification(""), 3000);

    } catch (error) {
      console.error("Upload failed", error);
      setNotification("❌ Failed to upload report.");
      setTimeout(() => setNotification(""), 3000);
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = null;
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const api = (await import("../../api/axios")).default;

        // Fetch Profile
        const aadhaar = localStorage.getItem("aadhaar");
        if (!aadhaar) throw new Error("Aadhaar number not found in session");

        // DEBUG CLAIMS
        try {
          const debugRes = await api.get("/api/auth/debug-claims");
          console.log("DEBUG CLAIMS:", debugRes.data);
        } catch (e) { console.error("Debug claims failed", e); }

        const profileRes = await api.get(`/api/Patients/${aadhaar}`);
        setPatient({
          name: profileRes.data.name,
          gender: profileRes.data.gender,
          bloodGroup: profileRes.data.bloodGroup || "N/A",
          phone: profileRes.data.phoneNumber,
          healthCard: profileRes.data.healthCardNumber,
          address: profileRes.data.address,
          dateOfBirth: profileRes.data.dateOfBirth
        });

        // Fetch Reports
        await fetchReports(api);

      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDownloadCard = async () => {
    try {
      setNotification("⏳ Downloading Health Card...");
      const api = (await import("../../api/axios")).default;
      const response = await api.get("/api/Patients/health-card", {
        responseType: "blob", // Important for binary data
      });

      // Create a blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `HealthCard_${patient.name.replace(/\s+/g, '_')}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      setNotification("✅ Health Card Downloaded!");
      setTimeout(() => setNotification(""), 3000);
    } catch (error) {
      console.error("Download failed", error);
      setNotification("❌ Failed to download Health Card.");
      setTimeout(() => setNotification(""), 3000);
    }
  };


  // Existing Logout Logic (Now triggers modal)
  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
    setShowDropdown(false); // Close dropdown if open
  };

  const performLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  // Intercept Back Button
  React.useEffect(() => {
    // Push a new state to history to create a history entry to "trap" the back button
    window.history.pushState(null, document.title, window.location.href);

    const handlePopState = (event) => {
      // When back button is pressed, push state again to stay on the page
      window.history.pushState(null, document.title, window.location.href);
      // Show the logout confirmation modal
      setShowLogoutConfirm(true);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);


  return (
    <div className="dashboard-page">
      {/* HEADER */}
      <div className="dashboard-header">
        <div className="header-left">
          {/* LOGO */}
          <div className="logo-icon">
            🏥
          </div>
          <div className="logo-text-container">
            <h1>AarogyaCard</h1>
            <span className="logo-subtitle">Patient Dashboard</span>
          </div>
        </div>

        {/* PROFILE DROPDOWN */}
        <div className="profile-dropdown-container">
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            className="profile-icon-btn"
          >
            <FaUser size={24} color="white" />
          </div>

          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <div className="dropdown-avatar">
                  <FaUser color="#5654ff" size={16} />
                </div>
                <div>
                  <span className="user-name">
                    {patient ? patient.name : "User"}
                  </span>
                  <span className="user-role">Patient Account</span>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <button onClick={handleLogoutClick} className="dropdown-item">
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>



      </div>

      {/* MAIN CONTENT */}
      <div className="dashboard-grid">
        {/* PATIENT INFO */}
        <div className="dashboard-card">
          <h3 className="card-title">
            <FaUser /> Patient Information
          </h3>

          {loading ? (
            <p className="loading-text">Loading profile...</p>
          ) : patient ? (
            <div className="health-card-container">
              {/* Visual Card Component */}
              <div className="digital-card">
                {/* Header */}
                <div className="health-card-header">
                  <div>
                    <h4 className="card-title-text">SMART HEALTH CARD</h4>
                    <span className="card-subtitle-text">Government of India</span>
                  </div>
                  <FaIdCard size={24} style={{ opacity: 0.9 }} />
                </div>

                {/* Content */}
                <div className="health-card-body">
                  <div className="card-photo-placeholder">
                    <FaUser size={30} color="#cbd5e0" />
                  </div>
                  <div className="card-details">
                    <div className="detail-row">
                      <span className="detail-label">Card No</span>
                      <span className="value-highlight">{patient.healthCard}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Name</span>
                      <span className="detail-value">{patient.name}</span>
                    </div>
                    <div className="card-footer-row">
                      <div>
                        <span className="detail-label">DOB</span><br />
                        <span className="value-small">{new Date(patient.dateOfBirth || Date.now()).toLocaleDateString("en-GB")}</span>
                      </div>
                      <div>
                        <span className="detail-label">Gender</span><br />
                        <span className="value-small">{patient.gender}</span>
                      </div>
                      <div>
                        <span className="detail-label">Blood</span><br />
                        <span className="value-highlight">{patient.bloodGroup}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="error-text">Failed to load profile.</p>
          )}

          <button className="primary-btn" onClick={handleDownloadCard}>
            <FaDownload /> Download Health Card
          </button>
        </div>

        {/* MEDICAL REPORTS */}
        <div className="dashboard-card">
          <div className="reports-header-row">
            <h3 className="reports-title-wrapper">
              <FaFileMedical /> Medical Reports
            </h3>
            <div className="upload-actions">
              {notification && (
                <span className={notification.includes("Failed") ? "notification-msg error" : "notification-msg success"}>
                  {notification}
                </span>
              )}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="application/pdf"
                onChange={handleFileUpload}
              />
              <button
                disabled={uploading}
                onClick={() => fileInputRef.current.click()}
                className={uploading ? "upload-btn disabled" : "upload-btn active"}
              >
                {uploading ? "Uploading..." : "Upload Report"} 📤
              </button>
            </div>
          </div>

          {reports.length === 0 && (
            <p className="no-reports">No reports uploaded yet</p>
          )}

          {reports.map((r) => (
            <div key={r.id} className="report-item">
              <div>
                <strong>{r.name}</strong>
                <p className="report-date">{r.date}</p>
              </div>
              <button
                className="download-btn-small"
                onClick={() => window.open(`http://localhost:5133${r.filePath}`, "_blank")}
              >
                <FaDownload />
              </button>
            </div>
          ))}
        </div>
      </div>

      <ConfirmationModal
        isOpen={showLogoutConfirm}
        title="Confirm Logout"
        message="Are you sure you want to log out of your account?"
        confirmText="Logout"
        cancelText="Stay logged in"
        onConfirm={performLogout}
        onCancel={() => setShowLogoutConfirm(false)}
        type="danger"
      />
    </div>
  );
}
