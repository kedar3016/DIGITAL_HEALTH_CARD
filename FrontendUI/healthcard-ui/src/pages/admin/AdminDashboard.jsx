import React, { useState } from "react";
import api from "../../api/axios";
import {
  FaMagnifyingGlass,
  FaCircleCheck,
  FaUserDoctor,
  FaFlask,
  FaArrowRightFromBracket,
  FaBars,
} from "react-icons/fa6";
import ConfirmationModal from "../../components/ConfirmationModal";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [pendingLabs, setPendingLabs] = useState([]);
  const [message, setMessage] = useState("");
  const [activeView, setActiveView] = useState("dashboard");
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const [verifiedLabs, setVerifiedLabs] = useState([]);
  const [verifiedDoctors, setVerifiedDoctors] = useState([]);

  // Unverify Modal State
  const [showUnverifyModal, setShowUnverifyModal] = useState(false);
  const [itemToUnverify, setItemToUnverify] = useState(null); // { id, type: 'doctor' | 'lab' }

  // Fetch data on mount
  React.useEffect(() => {
    fetchPendingDoctors();
    fetchPendingLabs();
    fetchVerifiedLabs();
    fetchVerifiedDoctors();
  }, []);

  const fetchPendingDoctors = async () => {
    try {
      const res = await api.get("/api/hospital-admin/pending-doctors");
      setPendingDoctors(res.data);
    } catch (err) {
      console.error("Failed to fetch pending doctors", err);
    }
  };

  const fetchPendingLabs = async () => {
    try {
      const res = await api.get("/api/hospital-admin/pending-lab-technicians");
      setPendingLabs(res.data);
    } catch (err) {
      console.error("Failed to fetch pending labs", err);
    }
  };

  const fetchVerifiedLabs = async () => {
    try {
      const res = await api.get("/api/hospital-admin/verified-lab-technicians");
      setVerifiedLabs(res.data);
    } catch (err) {
      console.error("Failed to fetch verified labs", err);
    }
  };

  const fetchVerifiedDoctors = async () => {
    try {
      const res = await api.get("/api/hospital-admin/verified-doctors");
      setVerifiedDoctors(res.data);
    } catch (err) {
      console.error("Failed to fetch verified doctors", err);
    }
  };

  const initUnverifyDoctor = (id) => {
    setItemToUnverify({ id, type: 'doctor' });
    setShowUnverifyModal(true);
  };

  const initUnverifyLab = (id) => {
    setItemToUnverify({ id, type: 'lab' });
    setShowUnverifyModal(true);
  };

  const performUnverify = async () => {
    if (!itemToUnverify) return;

    setLoading(true);
    try {
      if (itemToUnverify.type === 'doctor') {
        await api.post(`/api/hospital-admin/unverify-doctor/${itemToUnverify.id}`);
        setMessage("Doctor verification revoked.");
        fetchVerifiedDoctors();
        fetchPendingDoctors();
      } else if (itemToUnverify.type === 'lab') {
        await api.post(`/api/hospital-admin/unverify-lab-technician/${itemToUnverify.id}`);
        setMessage("Lab Technician verification revoked.");
        fetchVerifiedLabs();
        fetchPendingLabs();
      }
    } catch (err) {
      console.error("Unverification failed", err);
      const errMsg = err.response?.data || "Unverification failed";
      setMessage(`Error: ${typeof errMsg === 'string' ? errMsg : JSON.stringify(errMsg)}`);
    } finally {
      setLoading(false);
      setShowUnverifyModal(false);
      setItemToUnverify(null);
    }
  };

  const handleVerifyDoctor = async (id) => {
    try {
      setLoading(true);
      await api.post(`/api/hospital-admin/verify-doctor/${id}`);
      setMessage("Doctor verified successfully!");
      // Refresh list
      fetchPendingDoctors();
      fetchVerifiedDoctors();
    } catch (err) {
      console.error("Verification failed", err);
      // Try to extract error message properly
      const errMsg = err.response?.data || "Verification failed";
      setMessage(`Error: ${typeof errMsg === 'string' ? errMsg : JSON.stringify(errMsg)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyLab = async (id) => {
    try {
      setLoading(true);
      await api.post(`/api/hospital-admin/verify-lab-technician/${id}`);
      setMessage("Lab Technician verified successfully!");
      fetchPendingLabs();
      fetchVerifiedLabs(); // Add this to refresh the verified list
    } catch (err) {
      console.error("Verification failed", err);
      const errMsg = err.response?.data || "Verification failed";
      setMessage(`Error: ${typeof errMsg === 'string' ? errMsg : JSON.stringify(errMsg)}`);
    } finally {
      setLoading(false);
    }
  };

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="admin-dashboard-page">
      {/* HEADER */}
      <div className="admin-header">
        <div className="header-left">
          {/* LOGO */}
          <div className="logo-icon">
            🏥
          </div>
          <div className="logo-text-container">
            <h1>AarogyaCard</h1>
            <span className="logo-subtitle">Hospital Admin</span>
          </div>
        </div>

        {/* PROFILE DROPDOWN */}
        <div className="profile-dropdown-container">
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            className="profile-icon-btn"
          >
            <FaUserDoctor size={24} color="white" />
          </div>

          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <div className="dropdown-avatar">
                  <FaUserDoctor color="#5654ff" size={16} />
                </div>
                <div>
                  <span className="user-name">Admin User</span>
                  <span className="user-role">Hospital Administrator</span>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <button onClick={() => setShowLogoutPopup(true)} className="dropdown-item">
                <FaArrowRightFromBracket /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="admin-body">
        {/* SIDEBAR */}
        <div className="admin-sidebar">
          <button
            className={`admin-side-btn ${activeView === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveView("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`admin-side-btn ${activeView === "doctors" ? "active" : ""}`}
            onClick={() => setActiveView("doctors")}
          >
            Verified Doctors
          </button>
          <button
            className={`admin-side-btn ${activeView === "labs" ? "active" : ""}`}
            onClick={() => setActiveView("labs")}
          >
            Verified Labs
          </button>
        </div>

        {/* CONTENT */}
        <div className="admin-content">
          {/* SUCCESS MESSAGE */}
          {message && (
            <div className="admin-success-message">
              <FaCircleCheck /> {message}
            </div>
          )}

          {/* DASHBOARD */}
          {activeView === "dashboard" && (
            <div className="admin-grid">
              {/* VERIFY DOCTOR */}
              <div className="admin-card full-width">
                <h3 className="admin-card-title">
                  <FaUserDoctor /> Pending Doctor Verifications
                </h3>

                {pendingDoctors.length === 0 ? (
                  <p className="empty-state">No pending validations.</p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    {pendingDoctors.map(doc => (
                      <div key={doc.id} className="admin-list-item" style={{ alignItems: 'flex-start' }}>
                        <FaUserDoctor size={24} style={{ color: "#f5576c", marginTop: '4px' }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                            <strong>{doc.name}</strong>
                            <span className="badge-pending">PENDING</span>
                          </div>

                          <div className="admin-details-grid">
                            <span className="detail-label">Name:</span>
                            <span className="detail-value">{doc.name}</span>

                            <span className="detail-label">Specialization:</span>
                            <span className="detail-value">{doc.specialization}</span>

                            <span className="detail-label">License No:</span>
                            <span className="detail-value">{doc.licenseNumber}</span>
                          </div>
                        </div>
                        <button
                          className="admin-verify-btn"
                          onClick={() => handleVerifyDoctor(doc.id)}
                          disabled={loading}
                          style={{ alignSelf: 'center' }}
                        >
                          Verify
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* VERIFY LAB TECH */}
              <div className="admin-card full-width">
                <h3 className="admin-card-title">
                  <FaFlask /> Pending Lab Technician Verifications
                </h3>

                {pendingLabs.length === 0 ? (
                  <p className="empty-state">No pending validations.</p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    {pendingLabs.map(lab => (
                      <div key={lab.id} className="admin-list-item" style={{ alignItems: 'flex-start' }}>
                        <FaFlask size={24} style={{ color: "#4facfe", marginTop: '4px' }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                            <strong>{lab.technicianName}</strong>
                            <span className="badge-pending">PENDING</span>
                          </div>

                          <div className="admin-details-grid">
                            <span className="detail-label">Technician Name:</span>
                            <span className="detail-value">{lab.technicianName}</span>

                            <span className="detail-label">Lab Name:</span>
                            <span className="detail-value">{lab.labName}</span>

                            <span className="detail-label">Phone:</span>
                            <span className="detail-value">{lab.phoneNumber || "N/A"}</span>

                            <span className="detail-label">Email:</span>
                            <span className="detail-value">{lab.email || "N/A"}</span>

                            <span className="detail-label">Address:</span>
                            <span className="detail-value">{lab.labAddress || "N/A"}</span>
                          </div>
                        </div>
                        <button
                          className="admin-verify-btn"
                          onClick={() => handleVerifyLab(lab.id)}
                          disabled={loading}
                          style={{ alignSelf: 'center' }}
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

          {/* VERIFIED DOCTORS LIST */}
          {activeView === "doctors" && (
            <div className="admin-card">
              <h3>Verified Doctors</h3>
              {verifiedDoctors.length === 0 ? (
                <p className="empty-state">No verified doctors found.</p>
              ) : (
                verifiedDoctors.map((d) => (
                  <div key={d.id} className="admin-list-item" style={{ alignItems: 'flex-start' }}>
                    <FaUserDoctor size={24} style={{ marginTop: '4px' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <strong>{d.name}</strong>
                          <span className="badge-verified">Verified</span>
                        </div>
                        <button
                          className="admin-unverify-btn"
                          onClick={() => initUnverifyDoctor(d.id)}
                          disabled={loading}
                          style={{ marginLeft: 0 }}
                        >
                          Unverify
                        </button>
                      </div>

                      <div className="admin-details-grid">
                        <span className="detail-label">Specialization:</span>
                        <span className="detail-value">{d.specialization}</span>

                        <span className="detail-label">License No:</span>
                        <span className="detail-value">{d.licenseNumber}</span>

                        <span className="detail-label">Hospital ID:</span>
                        <span className="detail-value">{d.hospitalId || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* VERIFIED LABS LIST */}
          {activeView === "labs" && (
            <div className="admin-card">
              <h3>Verified Labs</h3>
              {verifiedLabs.length === 0 ? (
                <p className="empty-state">No verified labs found.</p>
              ) : (
                verifiedLabs.map((l) => (
                  <div key={l.id} className="admin-list-item" style={{ alignItems: 'flex-start' }}>
                    <FaFlask size={24} style={{ marginTop: '4px' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <strong>{l.technicianName}</strong>
                          <span className="badge-verified">Verified</span>
                        </div>
                        <button
                          className="admin-unverify-btn"
                          onClick={() => initUnverifyLab(l.id)}
                          disabled={loading}
                          style={{ marginLeft: 0 }}
                        >
                          Unverify
                        </button>
                      </div>

                      <div className="admin-details-grid">
                        <span className="detail-label">Lab Name:</span>
                        <span className="detail-value">{l.labName}</span>

                        <span className="detail-label">Phone:</span>
                        <span className="detail-value">{l.phoneNumber || "N/A"}</span>

                        <span className="detail-label">Email:</span>
                        <span className="detail-value">{l.email || "N/A"}</span>

                        <span className="detail-label">Address:</span>
                        <span className="detail-value">{l.labAddress || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* CONFIRMATION MODALS */}
      <ConfirmationModal
        isOpen={showLogoutPopup}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        confirmText="Logout"
        cancelText="No"
        onConfirm={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
        onCancel={() => setShowLogoutPopup(false)}
        type="danger"
      />

      <ConfirmationModal
        isOpen={showUnverifyModal}
        title="Revoke Verification?"
        message="This action will deactivate the account. They will need to be re-verified manually."
        confirmText="Yes, Unverify"
        cancelText="Cancel"
        onConfirm={performUnverify}
        onCancel={() => setShowUnverifyModal(false)}
        type="danger"
      />
    </div>
  );
}
