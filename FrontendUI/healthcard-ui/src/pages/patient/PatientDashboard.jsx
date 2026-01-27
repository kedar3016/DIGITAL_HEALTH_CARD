import { Link } from "react-router-dom";
import { logout } from "../../auth/roleGuard";

export default function PatientDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Patient Dashboard</h1>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/patient/profile" style={{ marginRight: "10px" }}>Profile</Link>
        <Link to="/patient/reports" style={{ marginRight: "10px" }}>Reports</Link>
        <Link to="/patient/health-card" style={{ marginRight: "10px" }}>Health Card</Link>
        <button onClick={logout} style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: "5px 10px" }}>Logout</button>
      </nav>
      <div>
        <h2>Welcome to your Health Dashboard</h2>
        <p>Manage your medical records securely.</p>
      </div>
    </div>
  );
}
