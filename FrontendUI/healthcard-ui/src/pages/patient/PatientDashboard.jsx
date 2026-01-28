import React, { useState } from "react";
import {
  FaUser,
  FaIdCard,
  FaFileMedical,
  FaDownload,
  FaSignOutAlt,
} from "react-icons/fa";
import ConfirmationModal from "../../components/ConfirmationModal";

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
            <span style={{ fontSize: "12px", opacity: 0.9, fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px" }}>Patient Dashboard</span>
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
            <FaUser size={24} color="white" />
          </div>

          {showDropdown && (
            <div style={styles.dropdownMenu}>
              <div style={styles.dropdownHeader}>
                <div style={styles.dropdownAvatar}>
                  <FaUser color="#5654ff" size={16} />
                </div>
                <div>
                  <span style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#333" }}>
                    {patient ? patient.name : "User"}
                  </span>
                  <span style={{ fontSize: "11px", color: "#888" }}>Patient Account</span>
                </div>
              </div>
              <div style={styles.dropdownDivider}></div>
              <button onClick={handleLogoutClick} style={styles.dropdownItem}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={styles.grid}>
        {/* PATIENT INFO */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>
            <FaUser /> Patient Information
          </h3>

          {loading ? (
            <p style={{ color: "#777", textAlign: "center" }}>Loading profile...</p>
          ) : patient ? (
            <div style={styles.healthCardContainer}>
              {/* Visual Card Component */}
              <div style={styles.digitalCard}>
                {/* Header */}
                <div style={styles.cardHeader}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "700" }}>SMART HEALTH CARD</h4>
                    <span style={{ fontSize: "10px", opacity: 0.8 }}>Government of India</span>
                  </div>
                  <FaIdCard size={24} style={{ opacity: 0.9 }} />
                </div>

                {/* Content */}
                <div style={styles.cardBody}>
                  <div style={styles.cardPhotoPlaceholder}>
                    <FaUser size={30} color="#cbd5e0" />
                  </div>
                  <div style={styles.cardDetails}>
                    <div style={styles.detailRow}>
                      <span style={styles.label}>Card No</span>
                      <span style={styles.valueHighlight}>{patient.healthCard}</span>
                    </div>
                    <div style={styles.detailRow}>
                      <span style={styles.label}>Name</span>
                      <span style={styles.value}>{patient.name}</span>
                    </div>
                    <div style={{ display: "flex", gap: "15px", marginTop: "5px" }}>
                      <div>
                        <span style={styles.label}>DOB</span><br />
                        <span style={styles.valueSmall}>{new Date(patient.dateOfBirth || Date.now()).toLocaleDateString("en-GB")}</span>
                      </div>
                      <div>
                        <span style={styles.label}>Gender</span><br />
                        <span style={styles.valueSmall}>{patient.gender}</span>
                      </div>
                      <div>
                        <span style={styles.label}>Blood</span><br />
                        <span style={styles.valueHighlight}>{patient.bloodGroup}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p style={{ color: "red", textAlign: "center" }}>Failed to load profile.</p>
          )}

          <button style={styles.primaryBtn} onClick={handleDownloadCard}>
            <FaDownload /> Download Health Card
          </button>
        </div>

        {/* MEDICAL REPORTS */}
        <div style={styles.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            <h3 style={{ margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
              <FaFileMedical /> Medical Reports
            </h3>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {notification && (
                <span style={{
                  fontSize: "13px",
                  color: notification.includes("Failed") ? "red" : "green",
                  fontWeight: "bold",
                  animation: "fadeIn 0.5s"
                }}>
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
                style={{
                  background: uploading ? "#ccc" : "#48bb78",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  cursor: uploading ? "not-allowed" : "pointer",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px"
                }}
              >
                {uploading ? "Uploading..." : "Upload Report"} 📤
              </button>
            </div>
          </div>

          {reports.length === 0 && (
            <p style={{ color: "#777" }}>No reports uploaded yet</p>
          )}

          {reports.map((r) => (
            <div key={r.id} style={styles.reportItem}>
              <div>
                <strong>{r.name}</strong>
                <p style={{ fontSize: "13px", color: "#666" }}>{r.date}</p>
              </div>
              <button
                style={styles.downloadBtn}
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

/* ===================== INLINE STYLES ===================== */

/* ===================== INLINE STYLES ===================== */

/* ===================== INLINE STYLES ===================== */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#eef2f6", // Light Blue-Gray background
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    color: "#334155",
  },

  header: {
    // Purple-Blue Gradient (From User Image)
    background: "linear-gradient(90deg, #5654ff 0%, #764ba2 100%)",
    color: "#fff",
    padding: "15px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 10px rgba(86, 84, 255, 0.3)",
    position: "sticky",
    top: 0,
    zIndex: 100, // Ensure header is above everything
  },

  // Deleted logoutBtn style since it's moved to dropdown

  // Dropdown Styles
  dropdownMenu: {
    position: "absolute",
    top: "50px",
    right: "0",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    width: "220px",
    overflow: "hidden",
    zIndex: 101, // Above header
    animation: "slideDown 0.3s ease-out", // Changed to slideDown for better effect
    transformOrigin: "top right",
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
    color: "#ef4444", // Red for logout
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textAlign: "left",
    transition: "background 0.2s",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px", // Increased gap
    padding: "30px 40px",
    maxWidth: "1200px",
    margin: "0 auto",
  },

  card: {
    background: "#fff",
    borderRadius: "12px", // Slightly less rounded than glassmorphism
    padding: "30px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)", // Clean soft shadow
    border: "none",
  },

  cardTitle: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px",
    color: "#333", // Darker text for title
    fontSize: "18px",
    fontWeight: "700",
  },

  primaryBtn: {
    width: "100%",
    // Purple-Blue Gradient Button (Matches Header)
    background: "linear-gradient(90deg, #5654ff 0%, #764ba2 100%)",
    color: "#fff",
    border: "none",
    padding: "14px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    alignItems: "center",
    marginTop: "20px",
    boxShadow: "0 4px 12px rgba(86, 84, 255, 0.4)", // Purple shadow
  },

  reportItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#f8f9fa",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "12px",
    border: "1px solid #e9ecef",
  },

  downloadBtn: {
    background: "#fff",
    border: "1px solid #5654ff", // Purple Border
    color: "#5654ff", // Purple Text
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
  },

  /* DIGITAL HEALTH CARD STYLES */
  healthCardContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  digitalCard: {
    width: "100%",
    maxWidth: "380px",
    // Calm Bluish Gradient with Reduced Opacity (Reserved as Requested)
    background: "linear-gradient(135deg, rgba(33, 147, 176, 0.85) 0%, rgba(109, 213, 237, 0.85) 100%)",
    backdropFilter: "blur(5px)", // Glass effect
    borderRadius: "16px",
    color: "white",
    boxShadow: "0 10px 25px rgba(33, 147, 176, 0.25)", // Softer shadow
    overflow: "hidden",
    position: "relative",
  },
  cardHeader: {
    padding: "15px 24px",
    background: "rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardBody: {
    padding: "20px",
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  cardPhotoPlaceholder: {
    width: "80px",
    height: "80px",
    background: "white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    color: "#cbd5e0",
  },
  cardDetails: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2px"
  },
  label: {
    fontSize: "11px",
    textTransform: "uppercase",
    opacity: 0.8,
    letterSpacing: "0.5px",
  },
  value: {
    fontSize: "15px",
    fontWeight: "600",
  },
  valueHighlight: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#fff",
    textShadow: "0 1px 2px rgba(0,0,0,0.2)",
  },
  valueSmall: {
    fontSize: "13px",
    fontWeight: "600",
  },
};
