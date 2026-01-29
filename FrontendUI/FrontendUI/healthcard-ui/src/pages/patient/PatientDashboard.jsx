import React, { useState } from "react";
import {
  FaUser,
  FaIdCard,
  FaFileMedical,
  FaDownload,
  FaSignOutAlt,
} from "react-icons/fa";

export default function PatientDashboard() {
  // MOCK DATA (replace with API later)
  const [patient] = useState({
    name: "Rahul Kumar Sharma",
    gender: "Male",
    bloodGroup: "A+",
    phone: "7588111644",
    healthCard: "HC-2026-889922",
  });

  const [reports] = useState([
    {
      id: 1,
      name: "Blood_Test_Report.pdf",
      date: "28 Jan 2026",
    },
    {
      id: 2,
      name: "Xray_Report.pdf",
      date: "15 Jan 2026",
    },
  ]);

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={{ margin: 0 }}>Patient Dashboard</h2>
          <small>Your Digital Health Records</small>
        </div>
        <button style={styles.logoutBtn}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div style={styles.grid}>
        {/* PATIENT INFO */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>
            <FaUser /> Patient Information
          </h3>

          {patient && (
            <div style={styles.infoBox}>
              <FaIdCard size={40} />
              <div>
                <p><strong>Name:</strong> {patient.name}</p>
                <p><strong>Gender:</strong> {patient.gender}</p>
                <p><strong>Blood Group:</strong> {patient.bloodGroup}</p>
                <p><strong>Phone:</strong> {patient.phone}</p>
                <p><strong>Health Card:</strong> {patient.healthCard}</p>
              </div>
            </div>
          )}

          <button style={styles.primaryBtn}>
            <FaDownload /> Download Health Card
          </button>
        </div>

        {/* MEDICAL REPORTS */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>
            <FaFileMedical /> Medical Reports
          </h3>

          {reports.length === 0 && (
            <p style={{ color: "#777" }}>No reports uploaded yet</p>
          )}

          {reports.map((r) => (
            <div key={r.id} style={styles.reportItem}>
              <div>
                <strong>{r.name}</strong>
                <p style={{ fontSize: "13px", color: "#666" }}>{r.date}</p>
              </div>
              <button style={styles.downloadBtn}>
                <FaDownload />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===================== INLINE STYLES ===================== */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #eef3f8, #dde8f1)",
    fontFamily: "Segoe UI, sans-serif",
  },

  header: {
    background: "#f5576c 100%",
    color: "#fff",
    padding: "20px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logoutBtn: {
    background: "rgba(255,255,255,0.15)",
    border: "1px solid #fff",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
    padding: "40px",
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
    background: "#f5576c 100%",
    color: "#fff",
    border: "none",
    padding: "14px",
    borderRadius: "12px",
    fontSize: "16px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    alignItems: "center",
  },

  reportItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#f7fafc",
    padding: "14px",
    borderRadius: "10px",
    marginBottom: "12px",
  },

  downloadBtn: {
    background: "#f5576c 100%",
    border: "none",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
