import { useState } from "react";
import api from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function PatientLogin() {
  const [aadhaar, setAadhaar] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const sendOtp = async () => {
    if (!aadhaar || aadhaar.length !== 12) {
      setError("Please enter a valid 12-digit Aadhaar number");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/api/auth/send-login-otp", { aadhaarNumber: aadhaar });
      console.log(response.data);
      // Navigate to OTP verification page
      navigate("/patient/verify-otp", { state: { aadhaar } });
    } catch (err) {
      console.error(err);
      setError("Failed to send OTP. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendOtp();
    }
  };

  const formatAadhaar = (value) => {
    // Remove non-digits
    const digits = value.replace(/\D/g, '');
    // Limit to 12 digits
    return digits.slice(0, 12);
  };

  const handleAadhaarChange = (e) => {
    const formatted = formatAadhaar(e.target.value);
    setAadhaar(formatted);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
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
        maxWidth: "420px",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Patient Card Icon */}
        <div style={{
          position: "absolute",
          top: "-20px",
          right: "-20px",
          width: "80px",
          height: "80px",
          background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold"
        }}>
          👤
        </div>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{
            color: "#2d3748",
            fontSize: "28px",
            fontWeight: "700",
            margin: "0 0 8px 0"
          }}>
            Patient Portal
          </h1>
          <p style={{
            color: "#718096",
            fontSize: "16px",
            margin: "0"
          }}>
            Access your health records securely
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
          <div style={{ marginBottom: "24px" }}>
            <label style={{
              display: "block",
              color: "#4a5568",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "6px"
            }}>
              Aadhaar Number
            </label>
            <input
              type="text"
              placeholder="Enter 12-digit Aadhaar number"
              value={aadhaar}
              onChange={handleAadhaarChange}
              onKeyPress={handleKeyPress}
              disabled={loading}
              maxLength="12"
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "16px",
                transition: "border-color 0.2s, box-shadow 0.2s",
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "monospace"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#a8edea";
                e.target.style.boxShadow = "0 0 0 3px rgba(168, 237, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.boxShadow = "none";
              }}
            />
            <p style={{
              color: "#718096",
              fontSize: "12px",
              margin: "4px 0 0 0"
            }}>
              Enter your 12-digit Aadhaar number for secure access
            </p>
          </div>

          <button
            onClick={sendOtp}
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px 20px",
              background: loading ? "#a0aec0" : "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
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
                e.target.style.boxShadow = "0 8px 25px rgba(168, 237, 234, 0.3)";
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
                Sending OTP...
              </>
            ) : (
              <>
                📱 Send OTP
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
            Secure patient data access
          </p>
          <p style={{
            color: "#718096",
            fontSize: "14px",
            margin: "0"
          }}>
            New patient?{" "}
            <Link
              to="/register/patient"
              style={{
                color: "#a8edea",
                textDecoration: "none",
                fontWeight: "600",
                transition: "color 0.2s"
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#fed6e3";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#a8edea";
              }}
            >
              Register here
            </Link>
          </p>
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