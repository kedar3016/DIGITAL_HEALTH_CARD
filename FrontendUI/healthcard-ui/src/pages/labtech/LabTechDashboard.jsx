import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { logout } from "../../auth/roleGuard";
import {
    FaFlask,
    FaSearch,
    FaFileMedical,
    FaDownload,
    FaSignOutAlt,
    FaUser,
    FaClipboardList
} from "react-icons/fa";
import ConfirmationModal from "../../components/ConfirmationModal";

export default function LabTechDashboard() {
    const [labTech, setLabTech] = useState(null);
    const [searchId, setSearchId] = useState("");
    const [searchedPatient, setSearchedPatient] = useState(null);
    const [patientReports, setPatientReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    /* New State for Upload */
    const [reportFile, setReportFile] = useState(null);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get("/api/LabTechnicians/me");
                setLabTech({
                    name: res.data.technicianName,
                    labName: res.data.labName
                });
            } catch (err) {
                console.error("Failed to fetch profile", err);
                // Fallback if fetch fails (e.g. token expired, handle gracefully)
                setLabTech({ name: "Lab Tech", labName: "Central Lab" });
            }
        };

        fetchProfile();
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

        try {
            // 1. Search Patient
            const patientRes = await api.get(`/api/Patients/readonly/${searchId}`);
            setSearchedPatient(patientRes.data);

            // Lab Technicians do not view reports, so we don't fetch them.

        } catch (err) {
            console.error("Search failed", err);
            setError("Patient not found or multiple records exist.");
        } finally {
            setSearchLoading(false);
        }
    };

    const performLogout = () => {
        logout();
        navigate("/");
    }

    const handleUploadReport = async () => {
        if (!searchedPatient || !reportFile || !searchId) return;

        setUploadLoading(true);
        setUploadMessage("");

        const formData = new FormData();
        formData.append("file", reportFile);

        try {
            // Use shared endpoint: /api/reports/upload/{healthCardId}
            await api.post(`/api/reports/upload/${searchId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setUploadMessage("✅ Report uploaded successfully!");
            setReportFile(null);

            // No need to refresh reports as Lab Techs don't see them

            // Clear message after 3 seconds
            setTimeout(() => setUploadMessage(""), 3000);

        } catch (err) {
            console.error("Upload failed", err);
            setUploadMessage("❌ Failed to upload report.");
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
                        color: "#0facfe", fontSize: "22px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                    }}>
                        🧪
                    </div>
                    <div>
                        <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "800", letterSpacing: "0.5px", lineHeight: "1.2" }}>AarogyaCard</h1>
                        <span style={{ fontSize: "12px", opacity: 0.9, fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px" }}>Lab Dashboard</span>
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
                                    <FaFlask color="#0facfe" size={16} />
                                </div>
                                <div>
                                    <span style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#333" }}>
                                        {labTech ? labTech.name : "Lab Tech"}
                                    </span>
                                    <span style={{ fontSize: "11px", color: "#888" }}>Lab Technician</span>
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

                        {/* UPLOAD & REPORTS */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>

                            {/* UPLOAD REPORT CARD */}
                            <div style={styles.card}>
                                <h3 style={styles.cardTitle}>
                                    <FaClipboardList /> Upload Lab Report
                                </h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                                    <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
                                        Upload a diagnostic report (PDF) for <strong>{searchedPatient.name}</strong>.
                                    </p>
                                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                        <input
                                            type="file"
                                            accept="application/pdf"
                                            onChange={(e) => setReportFile(e.target.files[0])}
                                            style={{
                                                padding: "10px",
                                                border: "1px solid #e2e8f0",
                                                borderRadius: "8px",
                                                flex: 1,
                                                fontSize: "14px"
                                            }}
                                        />
                                        <button
                                            onClick={handleUploadReport}
                                            disabled={!reportFile || uploadLoading}
                                            style={{
                                                ...styles.primaryBtn,
                                                background: !reportFile || uploadLoading ? "#cbd5e1" : "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                                                cursor: !reportFile || uploadLoading ? "not-allowed" : "pointer"
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


                        </div>
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
        </div>
    );
}

/* ===================== INLINE STYLES ===================== */
const styles = {
    page: {
        minHeight: "100vh",
        background: "#f0f9ff", // Light blue background for Lab theme
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: "#334155",
    },
    header: {
        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", // Lab Theme Gradient
        color: "#fff",
        padding: "15px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 10px rgba(79, 172, 254, 0.3)",
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
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        border: "1px solid #e0f2fe",
    },
    cardTitle: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "20px",
        color: "#0369a1", // Deep blue
        fontSize: "18px",
        fontWeight: "700",
        borderBottom: "2px solid #e0f2fe",
        paddingBottom: "10px",
    },
    searchInput: {
        flex: 1,
        padding: "12px 15px",
        borderRadius: "8px",
        border: "1px solid #cbd5e1",
        fontSize: "16px",
        outline: "none",
        transition: "border-color 0.2s",
    },
    primaryBtn: {
        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
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
        color: "#0284c7", // Highlight blue
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
        background: "#f0f9ff",
        padding: "15px",
        borderRadius: "8px",
        border: "1px solid #bae6fd",
    },
    downloadBtn: {
        background: "white",
        border: "1px solid #0ea5e9",
        color: "#0ea5e9",
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
        top: "120%",
        right: 0,
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        width: "220px",
        overflow: "hidden",
        zIndex: 101,
        border: "1px solid #e2e8f0"
    },
    dropdownHeader: {
        padding: "15px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        background: "#f0f9ff",
    },
    dropdownAvatar: {
        width: "35px",
        height: "35px",
        borderRadius: "50%",
        background: "#e0f2fe",
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
