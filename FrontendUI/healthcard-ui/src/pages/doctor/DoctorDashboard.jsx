import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { logout } from "../../auth/roleGuard";
import "./DoctorDashboard.css";

export default function DoctorDashboard() {
  const [doctor, setDoctor] = useState(null);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const doctorRes = await api.get("/api/doctors/me");
        setDoctor(doctorRes.data);

        try {
          const patientsRes = await api.get("/api/doctors/patients");
          setPatients(patientsRes.data || []);
        } catch {
          setPatients([]);
        }
      } catch (err) {
        console.error("Failed to load doctor dashboard data", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      setShowConfirmation(true);
    };

    window.addEventListener("popstate", handlePopState);
    window.history.pushState(null, null, window.location.pathname);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleConfirmLogout = () => {
    setShowConfirmation(false);
    logout();
    navigate("/");
  };

  const handleCancelLogout = () => {
    setShowConfirmation(false);
    window.history.pushState(null, null, window.location.pathname);
  };

  if (loading) {
    return (
      <div className="dashboard-loader">
        <div className="spinner"></div>
        <p>Loading doctor dashboard...</p>
      </div>
    );
  }

  return (
    <div className="doctor-dashboard">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>👨‍⚕️ Doctor Dashboard</h1>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      {error && <div className="error-banner">{error}</div>}

      {/* Welcome Section */}
      {doctor && (
        <div className="welcome-section">
          <div className="welcome-card">
            <h2>Welcome back, Dr. {doctor.name}! 👋</h2>
            <p>Access and manage your patient records securely</p>
            <div className="doctor-info">
              {doctor.licenseNumber && (
                <small>License: <strong>{doctor.licenseNumber}</strong></small>
              )}
              {doctor.specialization && (
                <small style={{marginLeft: "20px"}}>Specialization: <strong>{doctor.specialization}</strong></small>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{patients.length}</h3>
            <p>Patient Records</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>—</h3>
            <p>Appointments Today</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Active</h3>
            <p>Status</p>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="actions-section">
        <h2>Quick Actions</h2>
        <div className="action-cards">
          <div className="action-card" style={{cursor: "default", opacity: 0.7}}>
            <div className="action-icon">🔍</div>
            <h3>View Patients</h3>
            <p>Coming Soon</p>
          </div>
          <div className="action-card" style={{cursor: "default", opacity: 0.7}}>
            <div className="action-icon">📝</div>
            <h3>Add Notes</h3>
            <p>Coming Soon</p>
          </div>
          <div className="action-card" style={{cursor: "default", opacity: 0.7}}>
            <div className="action-icon">📊</div>
            <h3>Reports</h3>
            <p>Coming Soon</p>
          </div>
        </div>
      </div>

      {/* Patient Records Section */}
      {patients.length > 0 && (
        <div className="patients-section">
          <h2>Patient Records</h2>
          <div className="patients-list">
            {patients.slice(0, 5).map((patient) => (
              <div key={patient.id} className="patient-card">
                <div className="patient-header">
                  <div className="patient-info">
                    <h3>{patient.name}</h3>
                    <p className="patient-email">📧 {patient.email}</p>
                    {patient.bloodGroup && (
                      <p className="patient-blood">🩸 Blood Group: <strong>{patient.bloodGroup}</strong></p>
                    )}
                  </div>
                  <span className="patient-status">Active</span>
                </div>
                <div className="patient-footer">
                  {patient.phone && <p className="patient-phone">📱 {patient.phone}</p>}
                  {patient.lastVisit && (
                    <p className="last-visit">Last Visit: {new Date(patient.lastVisit).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          {patients.length > 5 && (
            <div className="view-all-link" style={{cursor: "default", opacity: 0.7}}>
              View All Patients → (Coming Soon)
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {patients.length === 0 && !loading && (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <h3>No Patient Records Yet</h3>
          <p>Patient records will appear here once they are assigned to you</p>
        </div>
      )}

      {/* Health Tips Section */}
      <div className="tips-section">
        <h2>💡 Health Tips for Doctors</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <h4>🔒 Patient Privacy</h4>
            <p>Always ensure patient data is handled securely and confidentially</p>
          </div>
          <div className="tip-card">
            <h4>📋 Accurate Records</h4>
            <p>Maintain accurate and up-to-date patient medical records</p>
          </div>
          <div className="tip-card">
            <h4>🤝 Patient Care</h4>
            <p>Provide comprehensive care by reviewing complete patient history</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>Doctor Dashboard | Last updated: {new Date().toLocaleString()}</p>
      </footer>

      {/* Logout Confirmation Modal */}
      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-modal">
            <div className="confirmation-header">
              <h3>⚠️ Are you sure?</h3>
            </div>
            <div className="confirmation-body">
              <p>Do you want to logout from your doctor account?</p>
              <p className="confirmation-note">This action will end your current session.</p>
            </div>
            <div className="confirmation-footer">
              <button 
                onClick={handleCancelLogout} 
                className="btn-cancel"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmLogout} 
                className="btn-confirm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}