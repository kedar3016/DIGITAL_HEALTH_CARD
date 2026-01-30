import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function LabTechForgotPassword() {
    const [email, setEmail] = useState("");
    const [step, setStep] = useState("email"); // email | reset
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSendOtp = async () => {
        if (!email) {
            setError("Please enter your registered email address");
            return;
        }

        setLoading(true);
        setError("");
        setMessage("");

        try {
            const res = await api.post("/api/auth/lab-tech/forgot-password", {
                email
            });

            // Show generic success message, adhering to user request "donot show otp on page"
            setMessage("OTP sent successfully. Please check your email.");

            // Switch to reset step
            setTimeout(() => {
                setStep("reset");
            }, 2000);

        } catch (err) {
            console.error("Forgot password failed", err);
            const errorMsg = err.response?.data?.message || err.message || "Something went wrong.";
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!otp || !newPassword || !confirmPassword) {
            setError("Please fill in all fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        setError("");
        setMessage("");

        try {
            const res = await api.post("/api/auth/lab-tech/reset-password", {
                email,
                otp,
                newPassword
            });

            setMessage("Password reset successfully! Redirecting to login...");
            setTimeout(() => {
                navigate("/login/lab");
            }, 2000);
        } catch (err) {
            console.error("Reset password failed", err);
            const errorMsg = err.response?.data?.message || err.message || "Something went wrong.";
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (step === 'email') handleSendOtp();
            else handleResetPassword();
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
                maxWidth: "420px",
                position: "relative",
                overflow: "hidden"
            }}>
                {/* Flask Icon */}
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
                        {step === "email" ? "Forgot Password?" : "Reset Password"}
                    </h1>
                    <p style={{
                        color: "#718096",
                        fontSize: "16px",
                        margin: "0"
                    }}>
                        {step === "email" ? "Enter your email to reset password" : "Enter OTP and your new password"}
                    </p>
                </div>

                {/* Messages */}
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
                        {error}
                    </div>
                )}

                {message && (
                    <div style={{
                        backgroundColor: "#f0fff4",
                        color: "#2f855a",
                        padding: "16px",
                        borderRadius: "8px",
                        marginBottom: "24px",
                        borderLeft: "4px solid #48bb78",
                        fontSize: "14px"
                    }}>
                        ✅ {message}
                    </div>
                )}

                {/* Step 1: Email Form */}
                {step === "email" && (
                    <div style={{ marginBottom: "24px" }}>
                        <div style={{ marginBottom: "16px" }}>
                            <label style={{
                                display: "block",
                                color: "#4a5568",
                                fontSize: "14px",
                                fontWeight: "600",
                                marginBottom: "6px"
                            }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="labtech@hospital.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
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

                        <button
                            onClick={handleSendOtp}
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
                                    Sending...
                                </>
                            ) : (
                                <>
                                    📩 Send OTP
                                </>
                            )}
                        </button>
                    </div>
                )}

                {/* Step 2: Reset Form */}
                {step === "reset" && (
                    <div style={{ marginBottom: "24px" }}>
                        <div style={{ marginBottom: "16px" }}>
                            <label style={{ display: "block", color: "#4a5568", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>
                                Enter OTP
                            </label>
                            <input
                                type="text"
                                placeholder="Enter verification code"
                                value={otp}
                                onChange={e => setOtp(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={loading}
                                style={{ width: "100%", padding: "12px 16px", border: "2px solid #e2e8f0", borderRadius: "8px", fontSize: "16px", outline: "none", boxSizing: "border-box" }}
                            />
                        </div>

                        <div style={{ marginBottom: "16px" }}>
                            <label style={{ display: "block", color: "#4a5568", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>
                                New Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                disabled={loading}
                                style={{ width: "100%", padding: "12px 16px", border: "2px solid #e2e8f0", borderRadius: "8px", fontSize: "16px", outline: "none", boxSizing: "border-box" }}
                            />
                        </div>

                        <div style={{ marginBottom: "24px" }}>
                            <label style={{ display: "block", color: "#4a5568", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={loading}
                                style={{ width: "100%", padding: "12px 16px", border: "2px solid #e2e8f0", borderRadius: "8px", fontSize: "16px", outline: "none", boxSizing: "border-box" }}
                            />
                        </div>

                        <button
                            onClick={handleResetPassword}
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
                                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
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
                                    Resetting...
                                </>
                            ) : (
                                <>
                                    🔐 Reset Password
                                </>
                            )}
                        </button>
                    </div>
                )}

                {/* Back to Login */}
                <div style={{ marginTop: "16px", textAlign: "center" }}>
                    <button
                        onClick={() => navigate("/login/lab")}
                        style={{
                            background: "transparent",
                            color: "#4facfe",
                            border: "none",
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: "pointer",
                            padding: "0",
                            fontFamily: "inherit"
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.color = "#00f2fe";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.color = "#4facfe";
                        }}
                    >
                        ← Back to Login
                    </button>
                </div>

                {/* Footer */}
                <div style={{
                    textAlign: "center",
                    paddingTop: "20px",
                    borderTop: "1px solid #e2e8f0",
                    marginTop: "20px"
                }}>
                    <p style={{
                        color: "#718096",
                        fontSize: "14px",
                        margin: "0"
                    }}>
                        Secure healthcare management system
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
