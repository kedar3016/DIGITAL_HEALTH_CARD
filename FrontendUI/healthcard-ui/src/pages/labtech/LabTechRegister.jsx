import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function LabTechRegister() {
  const [formData, setFormData] = useState({
    technicianName: "",
    email: "",
    password: "",
    confirmPassword: "",
    labName: "",

    phoneNumber: "",


    labAddress: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    let { name, value, type, checked } = e.target;

    if (name === "phoneNumber") {
      value = value.replace(/\D/g, '').slice(0, 10);
    }

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const register = async () => {
    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!formData.phoneNumber || formData.phoneNumber.length !== 10) {
      setError("Phone number must be exactly 10 digits");
      return;
    }

    if (!formData.name || !formData.email || !formData.password || !formData.labName) {

      setError("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError("Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await api.post("/api/LabTechnicians/register", {
        labName: formData.labName,
        labAddress: formData.labAddress,
        technicianName: formData.technicianName,
        phoneNumber: Number(formData.phoneNumber), // Convert to number for backend
        email: formData.email,
        password: formData.password
      });

      // Show success message and redirect to login
      alert("Registration successful! Please login with your credentials.");
      navigate("/login/lab");
    } catch (err) {
      console.error("Registration failed", err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
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
        maxWidth: "480px",
        position: "relative",
        overflow: "hidden"
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
            Join our diagnostic network
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
          {/* Name */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{
              display: "block",
              color: "#4a5568",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "6px"
            }}>
              TechnicianName *
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
          <div style={{ marginBottom: "16px" }}>
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
              placeholder="Enter your laboratory name"
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



          {/* Phone */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{
              display: "block",
              color: "#4a5568",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "6px"
            }}>
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              maxLength={10}
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
              Lab Address
            </label>
            <input
              type="text"
              name="labAddress"
              placeholder="Enter your laboratory address"
              value={formData.labAddress}
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
                Registering...
              </>
            ) : (
              <>
                🧪 Register as Lab Technician
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
            margin: "0 0 10px 0"
          }}>
            Already have an account?
          </p>
          <button
            onClick={() => navigate("/login/lab")}
            style={{
              background: "transparent",
              color: "#4facfe",
              border: "none",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              textDecoration: "underline"
            }}
          >
            Login here
          </button>
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
