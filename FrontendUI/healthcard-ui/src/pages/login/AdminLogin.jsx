import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.post("/api/auth/admin/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "Admin");
      localStorage.removeItem("session_warning_shown");

      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Login failed", err);
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      login();
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
        {/* Admin Shield Icon */}
        <div style={{
          position: "absolute",
          top: "-20px",
          right: "-20px",
          width: "80px",
          height: "80px",
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold"
        }}>
          🛡️
        </div>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{
            color: "#2d3748",
            fontSize: "28px",
            fontWeight: "700",
            margin: "0 0 8px 0"
          }}>
            Admin Portal
          </h1>
          <p style={{
            color: "#718096",
            fontSize: "16px",
            margin: "0"
          }}>
            Hospital administration access
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
          <div style={{ marginBottom: "16px" }}>
            <label style={{
              display: "block",
              color: "#4a5568",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "6px"
            }}>
              Username
            </label>
            <input
              type="text"
              placeholder="Enter admin username"
              value={username}
              onChange={e => setUserName(e.target.value)}
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
                e.target.style.borderColor = "#f093fb";
                e.target.style.boxShadow = "0 0 0 3px rgba(240, 147, 251, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{
              display: "block",
              color: "#4a5568",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "6px"
            }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
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
                e.target.style.borderColor = "#f093fb";
                e.target.style.boxShadow = "0 0 0 3px rgba(240, 147, 251, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <button
            onClick={login}
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px 20px",
              background: loading ? "#a0aec0" : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
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
                e.target.style.boxShadow = "0 8px 25px rgba(240, 147, 251, 0.3)";
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
                Signing In...
              </>
            ) : (
              <>
                🛡️ Login to Admin Panel
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
            margin: "0"
          }}>
            Hospital management system
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