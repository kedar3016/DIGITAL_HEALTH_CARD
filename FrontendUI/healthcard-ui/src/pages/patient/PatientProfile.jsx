import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function PatientProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get("/api/patients/me")
      .then(res => setProfile(res.data))
      .catch(() => alert("Failed to load profile"));
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/patient/dashboard">← Back to Dashboard</Link>
      <h2>Patient Profile</h2>
      <div style={{ marginTop: "20px" }}>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Blood Group:</strong> {profile.bloodGroup}</p>
        <p><strong>Date of Birth:</strong> {profile.dateOfBirth}</p>
        <p><strong>Health Card Number:</strong> {profile.healthCardNumber}</p>
        {/* Add more fields as needed */}
      </div>
    </div>
  );
}
