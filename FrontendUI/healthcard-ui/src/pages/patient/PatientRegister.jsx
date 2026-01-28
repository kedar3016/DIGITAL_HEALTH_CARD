import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function PatientRegister() {
  const [step, setStep] = useState(1); // 1: Aadhaar & OTP, 2: Registration Form
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formatAadhaar = (value) => {
    // Remove non-digits
    const digits = value.replace(/\D/g, '');
    // Limit to 12 digits
    return digits.slice(0, 12);
  };

  const handleAadhaarChange = (e) => {
    const formatted = formatAadhaar(e.target.value);
    setAadhaarNumber(formatted);
  };

  const sendOtp = async () => {
    if (!aadhaarNumber || aadhaarNumber.length !== 12) {
      setError("Please enter a valid 12-digit Aadhaar number");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await api.post("/api/aadhaar/send-otp", {
        aadhaarNumber: aadhaarNumber
      });
      setOtpSent(true);
      setError("");
    } catch (err) {
      console.error("OTP send failed", err);
      setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/api/aadhaar/verify-otp", {
        aadhaarNumber: aadhaarNumber,
        otp: otp
      });

      // Fetch patient data after OTP verification
    const patientData = response.data || {};

setFormData({
  name: patientData.name || "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: patientData.mobile?.toString() || "",
  dateOfBirth: patientData.dateOfBirth?.split("T")[0] || "",
  gender: patientData.gender || "",
  address: patientData.address || ""
});

      setStep(2);
      setError("");
    } catch (err) {
      console.error("OTP verification failed", err);
      setError(err.response?.data?.message || "OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const register = async () => {
    // Validation
    if (!formData.email || !formData.password) {
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
      await api.post("/api/auth/patient/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        aadhaarNumber: aadhaarNumber,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        address: formData.address
      });

      // Show success message and redirect to login
      alert("Registration successful! Please login with your Aadhaar number.");
      navigate("/login/patient");
    } catch (err) {
      console.error("Registration failed", err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const goBackToStep1 = () => {
    setStep(1);
    setOtp("");
    setOtpSent(false);
    setError("");
  };

  if (step === 1) {
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
          {/* Patient Icon */}
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
              Patient Registration
            </h1>
            <p style={{
              color: "#718096",
              fontSize: "16px",
              margin: "0"
            }}>
              Step 1: Verify your identity
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

          {/* Aadhaar Input */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{
              display: "block",
              color: "#4a5568",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "6px"
            }}>
              Aadhaar Number *
            </label>
            <input
              type="text"
              placeholder="Enter 12-digit Aadhaar number"
              value={aadhaarNumber}
              onChange={handleAadhaarChange}
              disabled={loading || otpSent}
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
          </div>

          {/* OTP Input - Show only after OTP is sent */}
          {otpSent && (
            <div style={{ marginBottom: "24px" }}>
              <label style={{
                display: "block",
                color: "#4a5568",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "6px"
              }}>
                Enter OTP *
              </label>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                disabled={loading}
                maxLength="6"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "2px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "16px",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: "monospace",
                  textAlign: "center",
                  letterSpacing: "2px"
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
                margin: "4px 0 0 0",
                textAlign: "center"
              }}>
                OTP sent to your registered mobile number
              </p>
            </div>
          )}

          {/* Buttons */}
          {!otpSent ? (
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
          ) : (
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={goBackToStep1}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: "14px 20px",
                  background: "#f7fafc",
                  color: "#4a5568",
                  border: "2px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#cbd5e1";
                  e.target.style.background = "#f1f5f9";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.background = "#f7fafc";
                }}
              >
                ← Back
              </button>
              <button
                onClick={verifyOtp}
                disabled={loading}
                style={{
                  flex: 1,
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
                    Verifying...
                  </>
                ) : (
                  <>
                    ✅ Verify OTP
                  </>
                )}
              </button>
            </div>
          )}

          {/* Footer */}
          <div style={{
            textAlign: "center",
            paddingTop: "20px",
            borderTop: "1px solid #e2e8f0",
            marginTop: "24px"
          }}>
            <p style={{
              color: "#718096",
              fontSize: "14px",
              margin: "0 0 12px 0"
            }}>
              Already have an account?
            </p>
            <a
              href="/login/patient"
              style={{
                color: "#a8edea",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "14px",
                transition: "color 0.2s"
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#fed6e3";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#a8edea";
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

  // Step 2: Registration Form with pre-populated data
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
        maxWidth: "500px",
        position: "relative",
        overflow: "hidden",
        maxHeight: "90vh",
        overflowY: "auto"
      }}>
        {/* Patient Icon */}
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
            Complete Registration
          </h1>
          <p style={{
            color: "#718096",
            fontSize: "16px",
            margin: "0"
          }}>
            Step 2: Fill in your details
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
          {/* Pre-populated fields (read-only) */}
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
              📋 Auto-filled from Aadhaar
            </h3>

            {/* Name */}
            <div style={{ marginBottom: "12px" }}>
              <label style={{
                display: "block",
                color: "#4a5568",
                fontSize: "12px",
                fontWeight: "600",
                marginBottom: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                Full Name
              </label>
              <div style={{
                padding: "8px 12px",
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                color: "#2d3748",
                fontSize: "14px"
              }}>
                {formData.name || "Not available"}
              </div>
            </div>

            {/* Date of Birth & Gender Row */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
              <div style={{ flex: 1 }}>
                <label style={{
                  display: "block",
                  color: "#4a5568",
                  fontSize: "12px",
                  fontWeight: "600",
                  marginBottom: "4px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}>
                  Date of Birth
                </label>
                <div style={{
                  padding: "8px 12px",
                  background: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  color: "#2d3748",
                  fontSize: "14px"
                }}>
                  {formData.dateOfBirth || "Not available"}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{
                  display: "block",
                  color: "#4a5568",
                  fontSize: "12px",
                  fontWeight: "600",
                  marginBottom: "4px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}>
                  Gender
                </label>
                <div style={{
                  padding: "8px 12px",
                  background: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  color: "#2d3748",
                  fontSize: "14px"
                }}>
                  {formData.gender || "Not available"}
                </div>
              </div>
            </div>

            {/* Address */}
            <div style={{ marginBottom: "12px" }}>
              <label style={{
                display: "block",
                color: "#4a5568",
                fontSize: "12px",
                fontWeight: "600",
                marginBottom: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                Address
              </label>
              <div style={{
                padding: "8px 12px",
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                color: "#2d3748",
                fontSize: "14px",
                minHeight: "40px",
                wordWrap: "break-word"
              }}>
                {formData.address || "Not available"}
              </div>
            </div>
          </div>

          {/* Manual entry fields */}
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
              📝 Additional Information
            </h3>

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
                  e.target.style.borderColor = "#a8edea";
                  e.target.style.boxShadow = "0 0 0 3px rgba(168, 237, 234, 0.1)";
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
                  e.target.style.borderColor = "#a8edea";
                  e.target.style.boxShadow = "0 0 0 3px rgba(168, 237, 234, 0.1)";
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
                  e.target.style.borderColor = "#a8edea";
                  e.target.style.boxShadow = "0 0 0 3px rgba(168, 237, 234, 0.1)";
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
                  e.target.style.borderColor = "#a8edea";
                  e.target.style.boxShadow = "0 0 0 3px rgba(168, 237, 234, 0.1)";
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
                Creating Account...
              </>
            ) : (
              <>
                👤 Create Patient Account
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
          <button
            onClick={goBackToStep1}
            style={{
              background: "none",
              border: "none",
              color: "#a8edea",
              textDecoration: "underline",
              cursor: "pointer",
              fontSize: "14px",
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
            ← Back to Step 1
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