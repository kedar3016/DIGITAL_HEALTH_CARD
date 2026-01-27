import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../auth/roleGuard";
import api from "../../api/axios";

export default function PatientDashboard() {
  const [patientData, setPatientData] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPatientData();
    fetchReports();
  }, []);

  const fetchPatientData = async () => {
    try {
      const response = await api.get("/api/patient/profile");
      setPatientData(response.data);
    } catch (err) {
      console.error("Failed to fetch patient data", err);
      setError("Failed to load patient data");
    }
  };

  const fetchReports = async () => {
    try {
      const response = await api.get("/api/patient/reports");
      setReports(response.data);
    } catch (err) {
      console.error("Failed to fetch reports", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "N/A";
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', system-ui, sans-serif"
      }}>
        <div style={{
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          padding: "40px",
          textAlign: "center"
        }}>
          <div style={{
            width: "40px",
            height: "40px",
            border: "4px solid #e2e8f0",
            borderTop: "4px solid #667eea",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 20px"
          }}></div>
          <p style={{ color: "#4a5568", fontSize: "16px" }}>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "20px",
      fontFamily: "'Inter', system-ui, sans-serif"
    }}>
      {/* Header */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        marginBottom: "30px"
      }}>
        <div style={{
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px"
        }}>
          <div>
            <h1 style={{
              color: "#2d3748",
              fontSize: "28px",
              fontWeight: "700",
              margin: "0 0 5px 0"
            }}>
              Welcome back, {patientData?.name || "Patient"}!
            </h1>
            <p style={{
              color: "#718096",
              fontSize: "16px",
              margin: "0"
            }}>
              Manage your health records and view your reports
            </p>
          </div>
          <div style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap"
          }}>
            <Link
              to="/patient/profile"
              style={{
                background: "#e2e8f0",
                color: "#4a5568",
                textDecoration: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                fontWeight: "600",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#cbd5e1";
                e.target.style.color = "#2d3748";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#e2e8f0";
                e.target.style.color = "#4a5568";
              }}
            >
              📋 Profile
            </Link>
            <Link
              to="/patient/reports"
              style={{
                background: "#e2e8f0",
                color: "#4a5568",
                textDecoration: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                fontWeight: "600",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#cbd5e1";
                e.target.style.color = "#2d3748";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#e2e8f0";
                e.target.style.color = "#4a5568";
              }}
            >
              📄 Reports
            </Link>
            <Link
              to="/patient/health-card"
              style={{
                background: "#e2e8f0",
                color: "#4a5568",
                textDecoration: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                fontWeight: "600",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#cbd5e1";
                e.target.style.color = "#2d3748";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#e2e8f0";
                e.target.style.color = "#4a5568";
              }}
            >
              🏥 Health Card
            </Link>
            <button
              onClick={logout}
              style={{
                background: "#dc3545",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#c82333";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#dc3545";
              }}
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto 20px",
          backgroundColor: "#fed7d7",
          color: "#c53030",
          padding: "12px 16px",
          borderRadius: "8px",
          border: "1px solid #feb2b2",
          fontSize: "14px"
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Main Content */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px"
      }}>
        {/* Patient Details Card */}
        <div style={{
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          padding: "24px",
          gridColumn: "span 2"
        }}>
          <h2 style={{
            color: "#2d3748",
            fontSize: "24px",
            fontWeight: "700",
            margin: "0 0 20px 0",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            👤 Patient Details
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px"
          }}>
            <div style={{
              background: "#f8fafc",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #e2e8f0"
            }}>
              <h3 style={{
                color: "#4a5568",
                fontSize: "14px",
                fontWeight: "600",
                margin: "0 0 8px 0",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                Full Name
              </h3>
              <p style={{
                color: "#2d3748",
                fontSize: "16px",
                fontWeight: "500",
                margin: "0"
              }}>
                {patientData?.name || "Not available"}
              </p>
            </div>
            <div style={{
              background: "#f8fafc",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #e2e8f0"
            }}>
              <h3 style={{
                color: "#4a5568",
                fontSize: "14px",
                fontWeight: "600",
                margin: "0 0 8px 0",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                age
              </h3>
              <p style={{
                color: "#2d3748",
                fontSize: "16px",
                fontWeight: "500",
                margin: "0"
              }}>
                {calculateAge(patientData?.dateOfBirth)}
              </p>
            </div>
            <div style={{
              background: "#f8fafc",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #e2e8f0"
            }}>
              <h3 style={{
                color: "#4a5568",
                fontSize: "14px",
                fontWeight: "600",
                margin: "0 0 8px 0",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                Blood Group
              </h3>
              <p style={{
                color: "#2d3748",
                fontSize: "16px",
                fontWeight: "500",
                margin: "0"
              }}>
                {patientData?.bloodGroup || "Not available"}
              </p>
            </div>
            <div style={{
              background: "#f8fafc",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #e2e8f0"
            }}>
              <h3 style={{
                color: "#4a5568",
                fontSize: "14px",
                fontWeight: "600",
                margin: "0 0 8px 0",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                Phone Number
              </h3>
              <p style={{
                color: "#2d3748",
                fontSize: "16px",
                fontWeight: "500",
                margin: "0"
              }}>
                {patientData?.phone || "Not available"}
              </p>
            </div>
            <div style={{
              background: "#f8fafc",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              gridColumn: "span 2"
            }}>
              <h3 style={{
                color: "#4a5568",
                fontSize: "14px",
                fontWeight: "600",
                margin: "0 0 8px 0",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                Address
              </h3>
              <p style={{
                color: "#2d3748",
                fontSize: "16px",
                fontWeight: "500",
                margin: "0",
                lineHeight: "1.5"
              }}>
                {patientData?.address || "Not available"}
              </p>
            </div>
            <div style={{
              background: "#f8fafc",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              gridColumn: "span 2"
            }}>
              <h3 style={{
                color: "#4a5568",
                fontSize: "14px",
                fontWeight: "600",
                margin: "0 0 8px 0",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                Nominee Name
              </h3>
              <p style={{
                color: "#2d3748",
                fontSize: "16px",
                fontWeight: "500",
                margin: "0"
              }}>
                {patientData?.nomineeName || "Not available"}
              </p>
            </div>
          </div>
        </div>

        {/* Lab Reports */}
        <div style={{
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          padding: "24px"
        }}>
          <h2 style={{
            color: "#2d3748",
            fontSize: "20px",
            fontWeight: "700",
            margin: "0 0 20px 0",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            🧪 Lab Reports
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {reports.filter(report => report.type === 'lab').length > 0 ? (
              reports.filter(report => report.type === 'lab').slice(0, 3).map((report, index) => (
                <div key={index} style={{
                  background: "#f8fafc",
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div>
                    <p style={{
                      color: "#2d3748",
                      fontSize: "14px",
                      fontWeight: "600",
                      margin: "0 0 4px 0"
                    }}>
                      {report.testName || `Lab Test ${index + 1}`}
                    </p>
                    <p style={{
                      color: "#718096",
                      fontSize: "12px",
                      margin: "0"
                    }}>
                      {new Date(report.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span style={{
                    background: report.status === 'normal' ? '#c6f6d5' : '#fed7d7',
                    color: report.status === 'normal' ? '#22543d' : '#c53030',
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "600"
                  }}>
                    {report.status || 'Pending'}
                  </span>
                </div>
              ))
            ) : (
              <p style={{
                color: "#718096",
                fontSize: "14px",
                textAlign: "center",
                margin: "20px 0"
              }}>
                No lab reports available
              </p>
            )}
          </div>
          {reports.filter(report => report.type === 'lab').length > 3 && (
            <Link
              to="/patient/reports"
              style={{
                display: "block",
                textAlign: "center",
                marginTop: "16px",
                color: "#667eea",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "14px"
              }}
            >
              View all lab reports →
            </Link>
          )}
        </div>

        {/* Medical Reports */}
        <div style={{
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          padding: "24px"
        }}>
          <h2 style={{
            color: "#2d3748",
            fontSize: "20px",
            fontWeight: "700",
            margin: "0 0 20px 0",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            🩺 Medical Reports
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {reports.filter(report => report.type === 'medical').length > 0 ? (
              reports.filter(report => report.type === 'medical').slice(0, 3).map((report, index) => (
                <div key={index} style={{
                  background: "#f8fafc",
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div>
                    <p style={{
                      color: "#2d3748",
                      fontSize: "14px",
                      fontWeight: "600",
                      margin: "0 0 4px 0"
                    }}>
                      {report.testName || `Medical Report ${index + 1}`}
                    </p>
                    <p style={{
                      color: "#718096",
                      fontSize: "12px",
                      margin: "0"
                    }}>
                      {new Date(report.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span style={{
                    background: report.status === 'completed' ? '#c6f6d5' : '#fef5e7',
                    color: report.status === 'completed' ? '#22543d' : '#744210',
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "600"
                  }}>
                    {report.status || 'Pending'}
                  </span>
                </div>
              ))
            ) : (
              <p style={{
                color: "#718096",
                fontSize: "14px",
                textAlign: "center",
                margin: "20px 0"
              }}>
                No medical reports available
              </p>
            )}
          </div>
          {reports.filter(report => report.type === 'medical').length > 3 && (
            <Link
              to="/patient/reports"
              style={{
                display: "block",
                textAlign: "center",
                marginTop: "16px",
                color: "#667eea",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "14px"
              }}
            >
              View all medical reports →
            </Link>
          )}
        </div>
      </div>

      {/* CSS Animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @media (max-width: 768px) {
            .dashboard-grid {
              grid-template-columns: 1fr;
            }
            .patient-details-grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
    </div>
  );
}
