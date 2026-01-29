import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import {
  FaSearch,
  FaCheckCircle,
  FaUserMd,
  FaFlask,
  FaSignOutAlt,
  FaBars,
  FaSync,
  FaUserCircle, // Added
} from "react-icons/fa";

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState("dashboard");
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // New state
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Data State
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [verifiedDoctors, setVerifiedDoctors] = useState([]);
  const [pendingLabs, setPendingLabs] = useState([]); // New state
  const [labTechnicians, setLabTechnicians] = useState([]);

  // Form State
  const [labForm, setLabForm] = useState({
    labName: "",
    labAddress: "",
    technicianName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  // Fetch Data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [pendingDocsRes, pendingLabsRes, verifiedDocsRes, labsRes] = await Promise.all([
        api.get("/api/hospital-admin/pending-doctors"),
        api.get("/api/hospital-admin/pending-labs"), // New pending labs endpoint
        api.get("/api/doctors"),
        api.get("/api/labtechnicians"),
      ]);

      setPendingDoctors(pendingDocsRes.data);
      setPendingLabs(pendingLabsRes.data);
      setVerifiedDoctors(verifiedDocsRes.data);
      setLabTechnicians(labsRes.data);
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Actions
  const handleVerifyDoctor = async (doctorId) => {
    try {
      await api.post(`/api/hospital-admin/verify-doctor/${doctorId}`);
      setMessage("Doctor verified successfully!");
      fetchData(); // Refresh data
    } catch (error) {
      console.error("Verification failed", error);
      alert("Failed to verify doctor");
    }
  };

  // New Action: Verify Lab
  const handleVerifyLab = async (labId) => {
    try {
      await api.post(`/api/hospital-admin/verify-lab/${labId}`);
      setMessage("Lab Technician verified successfully!");
      fetchData(); // Refresh data
    } catch (error) {
      console.error("Verification failed", error);
      alert("Failed to verify lab technician");
    }
  };

  const handleRegisterLab = async (e) => {
    e.preventDefault();
    try {
      // Admin manual registration is now effectively "Register and Verify" or just Register
      // But standard way is now to let them register themselves.
      // However, we can keep this form for Admin convenience.
      await api.post("/api/hospital-admin/register-lab-technician", labForm);
      setMessage("Lab Technician registered successfully!");
      setLabForm({
        labName: "",
        labAddress: "",
        technicianName: "",
        email: "",
        phoneNumber: "",
        password: "",
      });
      fetchData(); // Refresh data
    } catch (error) {
      console.error("Registration failed", error);
      alert("Failed to register lab technician");
    }
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaBars />
          <div>
            <h2 style={{ margin: 0 }}>Hospital Admin Dashboard</h2>
            <small>Quick Actions • Advanced Control</small>
          </div>
        </div>
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <button style={styles.iconBtn} onClick={fetchData} title="Refresh Data">
            <FaSync className={loading ? "spin" : ""} />
          </button>

          {/* Profile Dropdown */}
          <div style={{ position: "relative" }}>
            <FaUserCircle
              size={32}
              style={{ cursor: "pointer", color: "#fff" }}
              onClick={() => setShowDropdown(!showDropdown)}
            />

            {showDropdown && (
              <div style={styles.dropdownMenu}>
                <div style={styles.dropdownUser}>
                  <strong>Admin</strong>
                </div>
                <div style={styles.dropdownDivider}></div>
                <button
                  style={styles.dropdownItem}
                  onClick={() => {
                    setShowDropdown(false);
                    setShowLogoutPopup(true);
                  }}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={styles.body}>
        {/* SIDEBAR */}
        <div style={styles.sidebar}>
          <button
            style={{
              ...styles.sideBtn,
              background: activeView === "dashboard" ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.15)",
            }}
            onClick={() => setActiveView("dashboard")}
          >
            Dashboard
          </button>
          <button
            style={{
              ...styles.sideBtn,
              background: activeView === "doctors" ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.15)",
            }}
            onClick={() => setActiveView("doctors")}
          >
            Verified Doctors
          </button>
          <button
            style={{
              ...styles.sideBtn,
              background: activeView === "labs" ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.15)",
            }}
            onClick={() => setActiveView("labs")}
          >
            Verified Labs
          </button>
          <button
            style={{
              ...styles.sideBtn,
              background: activeView === "registerLab" ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.15)",
            }}
            onClick={() => setActiveView("registerLab")}
          >
            Register Lab
          </button>
        </div>

        {/* CONTENT */}
        <div style={styles.content}>
          {/* SUCCESS MESSAGE */}
          {message && (
            <div style={styles.success}>
              <FaCheckCircle /> {message}
              <button
                onClick={() => setMessage("")}
                style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "inherit" }}
              >
                ✕
              </button>
            </div>
          )}

          {/* DASHBOARD VIEW */}
          {activeView === "dashboard" && (
            <div style={styles.grid}>
              {/* PENDING DOCTORS SECTION */}
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>
                  <FaUserMd /> Pending Doctor Verifications
                </h3>

                {pendingDoctors.length === 0 ? (
                  <p style={{ color: "#777", fontStyle: "italic" }}>No pending doctors.</p>
                ) : (
                  <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                    {pendingDoctors.map((doc) => (
                      <div key={doc.id} style={styles.pendingItem}>
                        <div>
                          <strong>{doc.name}</strong>
                          <div style={{ fontSize: "12px", color: "#555" }}>
                            {doc.specialization} • License: {doc.licenseNumber}
                          </div>
                        </div>
                        <button
                          style={styles.verifyBtn}
                          onClick={() => handleVerifyDoctor(doc.id)}
                        >
                          Verify
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* PENDING LABS SECTION - NEW */}
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>
                  <FaFlask /> Pending Lab Verifications
                </h3>

                {pendingLabs.length === 0 ? (
                  <p style={{ color: "#777", fontStyle: "italic" }}>No pending lab technicians.</p>
                ) : (
                  <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                    {pendingLabs.map((lab) => (
                      <div key={lab.id} style={styles.pendingItem}>
                        <div>
                          <strong>{lab.labName}</strong>
                          <div style={{ fontSize: "12px", color: "#555" }}>
                            Tech: {lab.technicianName} • {lab.phoneNumber}
                          </div>
                        </div>
                        <button
                          style={styles.verifyBtn}
                          onClick={() => handleVerifyLab(lab.id)}
                        >
                          Verify
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>


            </div>
          )}

          {/* REGISTER LAB VIEW */}
          {activeView === "registerLab" && (
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>
                <FaFlask /> Register New Lab Technician (Manual)
              </h3>

              <form onSubmit={handleRegisterLab} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
                <input
                  style={styles.input}
                  placeholder="Lab Name"
                  required
                  value={labForm.labName}
                  onChange={(e) => setLabForm({ ...labForm, labName: e.target.value })}
                />
                <input
                  style={styles.input}
                  placeholder="Lab Address"
                  required
                  value={labForm.labAddress}
                  onChange={(e) => setLabForm({ ...labForm, labAddress: e.target.value })}
                />
                <input
                  style={styles.input}
                  placeholder="Technician Name"
                  required
                  value={labForm.technicianName}
                  onChange={(e) => setLabForm({ ...labForm, technicianName: e.target.value })}
                />
                <div style={{ display: "flex", gap: "10px" }}>
                  <input
                    style={styles.input}
                    placeholder="Email"
                    type="email"
                    required
                    value={labForm.email}
                    onChange={(e) => setLabForm({ ...labForm, email: e.target.value })}
                  />
                  <input
                    style={styles.input}
                    placeholder="Phone"
                    required
                    value={labForm.phoneNumber}
                    onChange={(e) => setLabForm({ ...labForm, phoneNumber: e.target.value })}
                  />
                </div>
                <input
                  style={styles.input}
                  placeholder="Password"
                  type="password"
                  required
                  value={labForm.password}
                  onChange={(e) => setLabForm({ ...labForm, password: e.target.value })}
                />

                <button type="submit" style={styles.primaryBtn}>
                  Register Lab Technician
                </button>
              </form>
            </div>
          )}

          {/* VERIFIED DOCTORS OR LABS DATA TABLES */}
          {(activeView === "doctors" || activeView === "labs") && (
            <div style={styles.card}>
              <h3>{activeView === "doctors" ? "Verified Doctors" : "Registered Lab Technicians"}</h3>
              {activeView === "doctors" ? (
                verifiedDoctors.length === 0 ? (
                  <p>No verified doctors found.</p>
                ) : (
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Specialization</th>
                        <th style={styles.th}>License</th>
                        <th style={styles.th}>Contact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {verifiedDoctors.map((d) => (
                        <tr key={d.id} style={styles.tr}>
                          <td style={styles.td}>{d.name}</td>
                          <td style={styles.td}>{d.specialization}</td>
                          <td style={styles.td}>{d.licenseNumber}</td>
                          <td style={styles.td}>{d.phoneNumber}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
              ) : (
                labTechnicians.length === 0 ? (
                  <p>No registered lab technicians found.</p>
                ) : (
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>Lab Name</th>
                        <th style={styles.th}>Technician</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Phone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {labTechnicians.map((l) => (
                        <tr key={l.id} style={styles.tr}>
                          <td style={styles.td}>{l.labName}</td>
                          <td style={styles.td}>{l.technicianName}</td>
                          <td style={styles.td}>{l.email}</td>
                          <td style={styles.td}>{l.phoneNumber}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* LOGOUT POPUP */}
      {showLogoutPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h3>Confirm Logout</h3>
            <p>Do you want to logout?</p>

            <div style={styles.popupActions}>
              <button
                style={styles.popupYes}
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
              >
                Yes
              </button>
              <button
                style={styles.popupNo}
                onClick={() => setShowLogoutPopup(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        `}</style>
    </div>
  );
}

/* ===================== STYLES ===================== */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #eef3f8, #dde8f1)",
    fontFamily: "Segoe UI, sans-serif",
  },

  header: {
    background: "linear-gradient(90deg, #f5576c, #ff8e8e)",
    color: "#fff",
    padding: "20px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  body: { display: "flex" },

  sidebar: {
    width: "250px",
    background: "linear-gradient(180deg, #f5576c, #ff8e8e)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    minHeight: "calc(100vh - 80px)",
  },

  sideBtn: {
    border: "none",
    color: "#fff",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    textAlign: "left",
    transition: "background 0.2s",
  },

  content: { flex: 1, padding: "30px" },

  iconBtn: {
    background: "transparent",
    border: "1px solid #fff",
    color: "#fff",
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  logoutBtn: {
    background: "rgba(255,255,255,0.15)",
    border: "1px solid #fff",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  success: {
    background: "#e6f7ec",
    color: "#1e7f43",
    padding: "10px 20px",
    borderRadius: "10px",
    marginBottom: "20px",
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
  },

  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "25px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
  },

  cardTitle: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px",
    borderBottom: "1px solid #eee",
    paddingBottom: "10px",
  },

  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    outline: "none",
  },

  primaryBtn: {
    width: "100%",
    background: "linear-gradient(90deg, #ff6a6a, #ff8e8e)",
    color: "#fff",
    border: "none",
    padding: "14px",
    borderRadius: "12px",
    cursor: "pointer",
    marginTop: "10px",
    fontWeight: "bold",
  },

  verifyBtn: {
    background: "#28a745",
    color: "#fff",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  pendingItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#f9f9f9",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "10px",
    borderLeft: "4px solid #ffc107",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },

  th: {
    textAlign: "left",
    padding: "12px",
    background: "#f1f1f1",
    borderBottom: "2px solid #ddd",
    fontSize: "14px",
  },

  tr: {
    borderBottom: "1px solid #eee",
  },

  td: {
    padding: "12px",
    fontSize: "14px",
  },

  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },

  popup: {
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    width: "320px",
    textAlign: "center",
  },

  popupActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "25px",
  },

  popupYes: {
    background: "linear-gradient(90deg, #f5576c, #ff8e8e)",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    cursor: "pointer",
  },

  popupNo: {
    background: "#f1f1f1",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    cursor: "pointer",
  },

  /* Dropdown Styles */
  dropdownMenu: {
    position: "absolute",
    top: "40px",
    right: "0",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    width: "150px",
    overflow: "hidden",
    zIndex: 100,
    animation: "fadeIn 0.2s ease",
  },

  dropdownUser: {
    padding: "12px",
    textAlign: "center",
    color: "#333",
    borderBottom: "1px solid #eee",
  },

  dropdownDivider: {
    height: "1px",
    background: "#eee",
  },

  dropdownItem: {
    width: "100%",
    padding: "12px",
    border: "none",
    background: "transparent",
    color: "#e53e3e",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontWeight: "bold",
    transition: "background 0.2s",
  },
};
