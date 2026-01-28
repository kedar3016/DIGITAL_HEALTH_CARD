import React, { useState } from "react";
import {
  FaSearch,
  FaCheckCircle,
  FaUserMd,
  FaFlask,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

export default function AdminDashboard() {
  const [doctorId, setDoctorId] = useState("");
  const [labId, setLabId] = useState("");
  const [message, setMessage] = useState("");
  const [activeView, setActiveView] = useState("dashboard");
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  // MOCK VERIFIED DATA
  const verifiedDoctors = [
    { id: 1, name: "Dr. Amit Sharma", specialization: "Neurologist" },
    { id: 2, name: "Dr. Neha Verma", specialization: "Cardiologist" },
  ];

  const verifiedLabs = [
    { id: 1, lab: "HealthPlus Diagnostics", tech: "Ramesh Verma" },
    { id: 2, lab: "Care Labs", tech: "Suresh Patel" },
  ];

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
        <button
          style={styles.logoutBtn}
          onClick={() => setShowLogoutPopup(true)}
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div style={styles.body}>
        {/* SIDEBAR */}
        <div style={styles.sidebar}>
          <button
            style={styles.sideBtn}
            onClick={() => setActiveView("dashboard")}
          >
            Dashboard
          </button>
          <button
            style={styles.sideBtn}
            onClick={() => setActiveView("doctors")}
          >
            Verified Doctors
          </button>
          <button
            style={styles.sideBtn}
            onClick={() => setActiveView("labs")}
          >
            Verified Labs
          </button>
        </div>

        {/* CONTENT */}
        <div style={styles.content}>
          {/* SUCCESS MESSAGE */}
          {message && (
            <div style={styles.success}>
              <FaCheckCircle /> {message}
            </div>
          )}

          {/* DASHBOARD */}
          {activeView === "dashboard" && (
            <div style={styles.grid}>
              {/* VERIFY DOCTOR */}
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>
                  <FaUserMd /> Verify Doctor
                </h3>

                <div style={styles.searchBox}>
                  <input
                    style={styles.input}
                    placeholder="Enter Doctor ID"
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                  />
                  <button style={styles.searchBtn}>Search</button>
                </div>

                <div style={styles.infoBox}>
                  <FaUserMd size={36} />
                  <div>
                    <strong>Dr. Amit Sharma</strong>
                    <p>Specialization: Neurologist</p>
                    <p>License: DOC-778899</p>
                  </div>
                </div>

                <button
                  style={styles.primaryBtn}
                  onClick={() =>
                    setMessage("Doctor verified successfully")
                  }
                >
                  Verify Doctor
                </button>
              </div>

              {/* VERIFY LAB */}
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>
                  <FaFlask /> Verify Lab Technician
                </h3>

                <div style={styles.searchBox}>
                  <input
                    style={styles.input}
                    placeholder="Enter Lab Technician ID"
                    value={labId}
                    onChange={(e) => setLabId(e.target.value)}
                  />
                  <button style={styles.searchBtn}>Search</button>
                </div>

                <div style={styles.infoBox}>
                  <FaFlask size={36} />
                  <div>
                    <strong>HealthPlus Diagnostics</strong>
                    <p>Technician: Ramesh Verma</p>
                    <p>Phone: +91 9876543210</p>
                  </div>
                </div>

                <button
                  style={styles.primaryBtn}
                  onClick={() =>
                    setMessage("Lab technician verified successfully")
                  }
                >
                  Verify Lab Technician
                </button>
              </div>
            </div>
          )}

          {/* VERIFIED DOCTORS LIST */}
          {activeView === "doctors" && (
            <div style={styles.card}>
              <h3>Verified Doctors</h3>
              {verifiedDoctors.map((d) => (
                <div key={d.id} style={styles.listItem}>
                  <FaUserMd />
                  <div>
                    <strong>{d.name}</strong>
                    <p>{d.specialization}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* VERIFIED LABS LIST */}
          {activeView === "labs" && (
            <div style={styles.card}>
              <h3>Verified Labs</h3>
              {verifiedLabs.map((l) => (
                <div key={l.id} style={styles.listItem}>
                  <FaFlask />
                  <div>
                    <strong>{l.lab}</strong>
                    <p>Technician: {l.tech}</p>
                  </div>
                </div>
              ))}
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
    width: "220px",
    background: "linear-gradient(180deg, #f5576c, #ff8e8e)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  sideBtn: {
    background: "rgba(255,255,255,0.15)",
    border: "none",
    color: "#fff",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    textAlign: "left",
  },

  content: { flex: 1, padding: "30px" },

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
  },

  searchBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
  },

  searchBtn: {
    background: "#ff6a6a",
    border: "none",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "10px",
  },

  infoBox: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    background: "#f7fafc",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "20px",
  },

  primaryBtn: {
    width: "100%",
    background: "linear-gradient(90deg, #ff6a6a, #ff8e8e)",
    color: "#fff",
    border: "none",
    padding: "14px",
    borderRadius: "12px",
    cursor: "pointer",
  },

  listItem: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    background: "#f7fafc",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "10px",
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
};
