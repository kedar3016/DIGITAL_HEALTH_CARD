import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function ResetPassword() {
    const { role } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Email passed from previous screen
    const email = location.state?.email || "";
    if (location.state?.debugOtp) {
        console.log("OTP for debugging:", location.state.debugOtp);
    }

    const getRoleName = () => {
        switch (role) {
            case 'doctor': return 'Doctor';
            case 'lab': return 'LabTechnician';
            case 'admin': return 'HospitalAdmin';
            default: return '';
        }
    };

    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            await api.post("/api/auth/reset-password", {
                email: email,
                otp: otp,
                newPassword: newPassword,
                role: getRoleName()
            });
            setSuccess(true);
            setTimeout(() => navigate(`/login/${role}`), 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Reset failed. Invalid OTP or Error.");
        } finally {
            setLoading(false);
        }
    };

    if (!email) {
        return <div style={{ padding: "40px", textAlign: "center" }}>Invalid Access. Please start from Forgot Password page.</div>;
    }

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
                maxWidth: "420px",
                position: "relative",
                overflow: "hidden"
            }}>
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "30px" }}>
                    <h1 style={{
                        color: "#2d3748",
                        fontSize: "28px",
                        fontWeight: "700",
                        margin: "0 0 8px 0"
                    }}>
                        Reset Password
                    </h1>
                    <p style={{
                        color: "#718096",
                        fontSize: "16px",
                        margin: "0"
                    }}>
                        Create a new secure password
                    </p>
                </div>

                {success ? (
                    <div style={{
                        backgroundColor: "#c6f6d5",
                        color: "#2f855a",
                        padding: "16px",
                        borderRadius: "8px",
                        textAlign: "center",
                        marginBottom: "20px",
                        fontWeight: "600"
                    }}>
                        ✅ Password Reset Successful! Redirecting...
                    </div>
                ) : (
                    <>
                        <p style={{ textAlign: "center", color: "#718096", marginBottom: "24px", fontSize: "14px", background: "#f7fafc", padding: "8px", borderRadius: "6px" }}>
                            OTP sent to <strong>{email}</strong>
                        </p>

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

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: "20px" }}>
                                <label style={{ display: "block", color: "#4a5568", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>OTP</label>
                                <input
                                    type="text"
                                    required
                                    maxLength="6"
                                    placeholder="Enter 6-digit OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "12px 16px",
                                        border: "2px solid #e2e8f0",
                                        borderRadius: "8px",
                                        fontSize: "18px",
                                        outline: "none",
                                        letterSpacing: "4px",
                                        textAlign: "center",
                                        transition: "border-color 0.2s"
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = "#4facfe"}
                                    onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                                />
                            </div>

                            <div style={{ marginBottom: "20px" }}>
                                <label style={{ display: "block", color: "#4a5568", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>New Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter new password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "12px 16px",
                                        border: "2px solid #e2e8f0",
                                        borderRadius: "8px",
                                        fontSize: "16px",
                                        outline: "none",
                                        boxSizing: "border-box",
                                        transition: "border-color 0.2s"
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = "#4facfe"}
                                    onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                                />
                            </div>

                            <div style={{ marginBottom: "24px" }}>
                                <label style={{ display: "block", color: "#4a5568", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>Confirm Password</label>
                                <input
                                    type="password"
                                    placeholder="Confirm new password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "12px 16px",
                                        border: "2px solid #e2e8f0",
                                        borderRadius: "8px",
                                        fontSize: "16px",
                                        outline: "none",
                                        boxSizing: "border-box",
                                        transition: "border-color 0.2s"
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = "#4facfe"}
                                    onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                                />
                            </div>

                            <button
                                type="submit"
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
                                        Resetting...
                                    </>
                                ) : (
                                    "Reset Password"
                                )}
                            </button>
                            <style>
                                {`
                            @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                            }
                        `}
                            </style>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
