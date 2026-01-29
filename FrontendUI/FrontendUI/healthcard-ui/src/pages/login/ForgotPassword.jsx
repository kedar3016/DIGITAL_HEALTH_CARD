import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function ForgotPassword() {
    const { role } = useParams(); // 'doctor', 'lab', 'admin'
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const getRoleName = () => {
        switch (role) {
            case 'doctor': return 'Doctor';
            case 'lab': return 'LabTechnician';
            case 'admin': return 'HospitalAdmin';
            default: return '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await api.post("/api/auth/forgot-password", {
                email: email,
                role: getRoleName()
            });
            console.log("Forgot Password API Response:", response.data);
            navigate(`/reset-password/${role}`, { state: { email, debugOtp: response.data.Otp } });
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send OTP. Please check your email.");
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
                        Forgot Password
                    </h1>
                    <p style={{
                        color: "#718096",
                        fontSize: "16px",
                        margin: "0"
                    }}>
                        Enter your registered email to receive an OTP.
                    </p>
                </div>

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
                    <div style={{ marginBottom: "24px" }}>
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
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                                Sending OTP...
                            </>
                        ) : (
                            "Send OTP"
                        )}
                    </button>
                </form>
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
