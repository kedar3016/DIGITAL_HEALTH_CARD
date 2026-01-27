import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function LabTechRegister() {
  const [formData, setFormData] = useState({
    labName: "",
    labAddress: "",
    technicianName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const register = async () => {
    // Validation
    if (!formData.labName || !formData.labAddress || !formData.technicianName ||
        !formData.phoneNumber || !formData.email || !formData.password) {
      setError("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await api.post("/api/auth/lab-tech/register", {
        labName: formData.labName,
        labAddress: formData.labAddress,
        technicianName: formData.technicianName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        password: formData.password
      });

      alert("Registration successful! Please login with your credentials.");
      navigate("/login/lab");
    } catch (err) {
      console.error("Registration failed", err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      register();
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "'Inter', system-ui, sans-serif"
    }}>
      <div style={{
        background: "white",
        borderRadius: "16px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        padding: "40px",
        width: "100%",
        maxWidth: "500px",
        position: "relative",
        overflow: "hidden",
        maxHeight: "90vh",
        overflowY: "auto"
      }}>
        {/* Lab Flask Icon */}
        <div style={{
          position: "absolute",
          top: "-20px",
          right: "-20px",
          width: "80px",
          height: "80px",
          background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold"
        }}>
          🧪
        </div>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{
            color: "#2d3748",
            fontSize: "28px",
            fontWeight: "700",
            margin: "0 0 8px 0"
          }}>
            Lab Technician Registration
          </h1>
          <p style={{
            color: "#718096",
            fontSize: "16px",
            margin: "0"
          }}>
            Register your laboratory
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            backgroundColor: "#fed7d7",
            color: "#c53030",
            padding: "12px 16px",
            borderRadius: "8px",
            marginBottom: "20px",
            border: "1px solid #feb2b2",
            fontSize: "14px"
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <div style={{ marginBottom: "24px" }}>
          {/* Lab Information */}
          <div style={{
            background: "#f8fafc",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "24px",
            border: "1px solid #e2e8f0"
          }}>
            <h3 style={{
              color: "#2d3748",
              fontSize: "16px",
              fontWeight: "600",
              margin: "0 0 16px 0"
            }}>
              🏥 Laboratory Details
            </h3>

            {/* Lab Name */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{
                display: "block",
                color: "#4a5568",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "6px"
              }}>
                Laboratory Name *
              </label>
              <input
                type="text"
                name="labName"
                placeholder="Enter laboratory name"
                value={formData.labName}
                onChange={handleChange}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "2px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "16px",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  outline: "none",
                  boxSizing: "border-box"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#4facfe";
                  e.target.style.boxShadow = "0 0 0 3px rgba(79, 172, 254, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Lab Address */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{
                display: "block",
                color: "#4a5568",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "6px"
              }}>
                Laboratory Address *
              </label>
              <textarea
                name="labAddress"
                placeholder="Enter complete laboratory address"
                value={formData.labAddress}
                onChange={handleChange}
                disabled={loading}
                rows="3"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "2px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "16px",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  outline: "none",
                  boxSizing: "border-box",
                  resize: "vertical"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#4facfe";
                  e.target.style.boxShadow = "0 0 0 3px rgba(79, 172, 254, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Personal Information */}
          <div style={{
            borderTop: "1px solid #e2e8f0",
            paddingTop: "24px"
          }}>
            <h3 style={{
              color: "#2d3748",
              fontSize: "16px",
              fontWeight: "600",
              margin: "0 0 16px 0"
            }}>
              👤 Personal Details
            </h3>

            {/* Technician Name */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{
                display: "block",
                color: "#4a5568",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "6px"
              }}>
                Technician Name *
              </label>
              <input
                type="text"
                name="technicianName"
                placeholder="Enter your full name"
                value={formData.technicianName}
                onChange={handleChange}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "2px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "16px",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  outline: "none",
                  boxSizing: "border-box"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#4facfe";
                  e.target.style.boxShadow = "0 0 0 3px rgba(79, 172, 254, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Phone Number */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{
                display: "block",
                color: "#4a5568",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "6px"
              }}>
                Phone Number *
              </label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "2px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "16px",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  outline: "none",
                  boxSizing: "border-box"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#4facfe";
                  e.target.style.boxShadow = "0 0 0 3px rgba(79, 172, 254, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{
                display: "block",
                color: "#4a5568",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "6px"
              }}>
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "2px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "16px",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  outline: "none",
                  boxSizing: "border-box"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#4facfe";
                  e.target.style.boxShadow = "0 0 0 3px rgba(79, 172, 254, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{
                display: "block",
                color: "#4a5568",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "6px"
              }}>
                Password *
              </label>
              <input
                type="password"
                name="password"
                placeholder="Create a password (min 6 characters)"
                value={formData.password}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "2px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "16px",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  outline: "none",
                  boxSizing: "border-box"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#4facfe";
                  e.target.style.boxShadow = "0 0 0 3px rgba(79, 172, 254, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{
                display: "block",
                color: "#4a5568",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "6px"
              }}>
                Confirm Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "2px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "16px",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  outline: "none",
                  boxSizing: "border-box"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#4facfe";
                  e.target.style.boxShadow = "0 0 0 3px rgba(79, 172, 254, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          <button
            onClick={register}
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px 20px",
              background: loading ? "#a0aec0" : "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px"
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 25px rgba(79, 172, 254, 0.3)";
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            {loading ? (
              <>
                <div style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid #ffffff",
                  borderTop: "2px solid transparent",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite"
                }}></div>
                Creating Account...
              </>
            ) : (
              <>
                🧪 Register Lab Technician
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center",
          paddingTop: "20px",
          borderTop: "1px solid #e2e8f0"
        }}>
          <p style={{
            color: "#718096",
            fontSize: "14px",
            margin: "0 0 12px 0"
          }}>
            Already have an account?
          </p>
          <a
            href="/login/lab"
            style={{
              color: "#4facfe",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "14px",
              transition: "color 0.2s"
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "#00f2fe";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "#4facfe";
            }}
          >
            Login here
          </a>
        </div>

        {/* Add CSS animation for loading spinner */}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
}
