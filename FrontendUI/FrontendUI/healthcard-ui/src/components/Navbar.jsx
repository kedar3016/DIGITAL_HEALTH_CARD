import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav style={{
      padding: "20px 40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      borderBottom: "1px solid rgba(0, 0, 0, 0.05)"
    }}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "40px",
            height: "40px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold"
          }}>
            🏥
          </div>
          <h2 style={{
            fontSize: "24px",
            fontWeight: "800",
            color: "#0f172a",
            margin: 0,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            AarogyaCard
          </h2>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "32px"
      }}>
        <Link to="/" style={{
          textDecoration: "none",
          fontWeight: "600",
          color: "#0f172a",
          transition: "color 0.3s ease",
          fontSize: "16px"
        }}
        onMouseEnter={(e) => e.target.style.color = "#667eea"}
        onMouseLeave={(e) => e.target.style.color = "#0f172a"}>
          Home
        </Link>

        {/* Login Dropdown */}
        <div style={{ position: "relative" }}>
          <button
            onClick={toggleDropdown}
            style={{
              background: "none",
              border: "none",
              fontWeight: "600",
              color: "#0f172a",
              cursor: "pointer",
              padding: "8px 16px",
              borderRadius: "8px",
              transition: "all 0.3s ease",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(102, 126, 234, 0.1)";
              e.target.style.color = "#667eea";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "none";
              e.target.style.color = "#0f172a";
            }}
          >
            Login
            <span style={{
              transition: "transform 0.3s ease",
              transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)"
            }}>▼</span>
          </button>

          {isDropdownOpen && (
            <div style={{
              position: "absolute",
              top: "100%",
              right: 0,
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
              padding: "8px 0",
              minWidth: "200px",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              zIndex: 1000
            }}>
              <Link
                to="/login/patient"
                onClick={() => setIsDropdownOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 20px",
                  textDecoration: "none",
                  color: "#0f172a",
                  transition: "background 0.2s ease",
                  fontSize: "14px",
                  fontWeight: "500"
                }}
                onMouseEnter={(e) => e.target.style.background = "rgba(102, 126, 234, 0.05)"}
                onMouseLeave={(e) => e.target.style.background = "transparent"}
              >
                <span style={{ fontSize: "16px" }}>👤</span>
                Patient Portal
              </Link>
              <Link
                to="/login/doctor"
                onClick={() => setIsDropdownOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 20px",
                  textDecoration: "none",
                  color: "#0f172a",
                  transition: "background 0.2s ease",
                  fontSize: "14px",
                  fontWeight: "500"
                }}
                onMouseEnter={(e) => e.target.style.background = "rgba(102, 126, 234, 0.05)"}
                onMouseLeave={(e) => e.target.style.background = "transparent"}
              >
                <span style={{ fontSize: "16px" }}>👨‍⚕️</span>
                Doctor Portal
              </Link>
              <Link
                to="/login/lab"
                onClick={() => setIsDropdownOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 20px",
                  textDecoration: "none",
                  color: "#0f172a",
                  transition: "background 0.2s ease",
                  fontSize: "14px",
                  fontWeight: "500"
                }}
                onMouseEnter={(e) => e.target.style.background = "rgba(102, 126, 234, 0.05)"}
                onMouseLeave={(e) => e.target.style.background = "transparent"}
              >
                <span style={{ fontSize: "16px" }}>🧪</span>
                Lab Portal
              </Link>
              <Link
                to="/login/admin"
                onClick={() => setIsDropdownOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 20px",
                  textDecoration: "none",
                  color: "#0f172a",
                  transition: "background 0.2s ease",
                  fontSize: "14px",
                  fontWeight: "500"
                }}
                onMouseEnter={(e) => e.target.style.background = "rgba(102, 126, 234, 0.05)"}
                onMouseLeave={(e) => e.target.style.background = "transparent"}
              >
                <span style={{ fontSize: "16px" }}>🛡️</span>
                Admin Portal
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        style={{
          display: "none",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "8px",
          borderRadius: "6px",
          transition: "background 0.2s ease"
        }}
        onMouseEnter={(e) => e.target.style.background = "rgba(0, 0, 0, 0.05)"}
        onMouseLeave={(e) => e.target.style.background = "transparent"}
      >
        <span style={{
          display: "block",
          width: "20px",
          height: "2px",
          background: "#0f172a",
          margin: "4px 0",
          transition: "all 0.3s ease",
          transform: isMobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none"
        }}></span>
        <span style={{
          display: "block",
          width: "20px",
          height: "2px",
          background: "#0f172a",
          margin: "4px 0",
          transition: "all 0.3s ease",
          opacity: isMobileMenuOpen ? "0" : "1"
        }}></span>
        <span style={{
          display: "block",
          width: "20px",
          height: "2px",
          background: "#0f172a",
          margin: "4px 0",
          transition: "all 0.3s ease",
          transform: isMobileMenuOpen ? "rotate(-45deg) translate(7px, -6px)" : "none"
        }}></span>
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          background: "white",
          borderTop: "1px solid rgba(0, 0, 0, 0.05)",
          padding: "20px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)"
        }}>
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              display: "block",
              padding: "12px 0",
              textDecoration: "none",
              color: "#0f172a",
              fontWeight: "600",
              borderBottom: "1px solid rgba(0, 0, 0, 0.05)"
            }}
          >
            Home
          </Link>
          <div style={{ padding: "12px 0", borderBottom: "1px solid rgba(0, 0, 0, 0.05)" }}>
            <div style={{ fontWeight: "600", marginBottom: "8px", color: "#0f172a" }}>Login Options</div>
            <Link to="/login/patient" onClick={() => setIsMobileMenuOpen(false)} style={{ display: "block", padding: "8px 0", textDecoration: "none", color: "#64748b", fontSize: "14px" }}>👤 Patient Portal</Link>
            <Link to="/login/doctor" onClick={() => setIsMobileMenuOpen(false)} style={{ display: "block", padding: "8px 0", textDecoration: "none", color: "#64748b", fontSize: "14px" }}>👨‍⚕️ Doctor Portal</Link>
            <Link to="/login/lab" onClick={() => setIsMobileMenuOpen(false)} style={{ display: "block", padding: "8px 0", textDecoration: "none", color: "#64748b", fontSize: "14px" }}>🧪 Lab Portal</Link>
            <Link to="/login/admin" onClick={() => setIsMobileMenuOpen(false)} style={{ display: "block", padding: "8px 0", textDecoration: "none", color: "#64748b", fontSize: "14px" }}>🛡️ Admin Portal</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
