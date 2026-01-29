import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function DoctorRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    specialization: "",
    licenseNumber: "",
    phone: "",
    experience: ""
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
    // Validation Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;

    // Detailed Validation
    if (!formData.name.trim()) return setError("Full Name is required");
    if (!emailRegex.test(formData.email)) return setError("Invalid Email Address");
    if (!passwordRegex.test(formData.password)) return setError("Password must be at least 6 chars, include a number & special char");
    if (formData.password !== formData.confirmPassword) return setError("Passwords do not match");
    if (!formData.specialization) return setError("Specialization is required");
    if (!formData.licenseNumber.trim()) return setError("License Number is required");
    if (!phoneRegex.test(formData.phone)) return setError("Phone number must be exactly 10 digits");
    if (!formData.experience || formData.experience < 0) return setError("Valid experience years required");

    setLoading(true);
    setError("");

    try {
      await api.post("/api/doctors/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        specialization: formData.specialization,
        licenseNumber: formData.licenseNumber,
        phone: formData.phone,
        experience: formData.experience
      });

      // Show success message and redirect to login
      alert("Registration successful! Please login with your credentials.");
      navigate("/login/doctor");
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
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
        {/* Doctor Icon */}
        <div style={{
          position: "absolute",
          top: "-20px",
          right: "-20px",
          width: "80px",
          height: "80px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold"
        }}>
          👨‍⚕️
        </div>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{
            color: "#2d3748",
            fontSize: "28px",
            fontWeight: "700",
            margin: "0 0 8px 0"
          }}>
            Doctor Registration
          </h1>
          <p style={{
            color: "#718096",
            fontSize: "16px",
            margin: "0"
          }}>
            Join our healthcare network
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
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
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
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
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
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
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
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
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
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Specialization */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{
              display: "block",
              color: "#4a5568",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "6px"
            }}>
              Specialization *
            </label>
            <select
              name="specialization"
              value={formData.specialization}
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
                boxSizing: "border-box",
                background: "white"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.boxShadow = "none";
              }}
            >
              <option value="">Select your specialization</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Neurology">Neurology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Psychiatry">Psychiatry</option>
              <option value="Radiology">Radiology</option>
              <option value="Surgery">Surgery</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* License Number */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{
              display: "block",
              color: "#4a5568",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "6px"
            }}>
              Medical License Number *
            </label>
            <input
              type="text"
              name="licenseNumber"
              placeholder="Enter your medical license number"
              value={formData.licenseNumber}
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
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
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
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
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
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Experience */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{
              display: "block",
              color: "#4a5568",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "6px"
            }}>
              Years of Experience
            </label>
            <input
              type="number"
              name="experience"
              placeholder="Enter years of experience"
              value={formData.experience}
              onChange={handleChange}
              disabled={loading}
              min="0"
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
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
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
              background: loading ? "#a0aec0" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
                e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.3)";
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
                📝 Register as Doctor
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
            onClick={() => navigate("/login/doctor")}
            style={{
              background: "transparent",
              color: "#667eea",
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