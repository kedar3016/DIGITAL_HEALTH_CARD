import { Link } from "react-router-dom";

export default function Roles() {
  const roles = [
    {
      title: "Patient",
      description: "Access your comprehensive health records, download medical reports, manage appointments, and share health data securely with healthcare providers.",
      icon: "👤",
      link: "/login/patient",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      features: ["Digital Health Card", "Report Downloads", "Appointment Management", "Emergency Access"],
      stats: "Active Users"
    },
    {
      title: "Doctor",
      description: "Verify patient records, access medical history, provide telemedicine consultations, and collaborate with other healthcare professionals.",
      icon: "👨‍⚕️",
      link: "/login/doctor",
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      features: ["Patient Verification", "Medical Records", "Telemedicine", "Secure Collaboration"],
      stats: "Verified Doctors"
    },
    {
      title: "Lab Technician",
      description: "Upload test results, manage lab reports, ensure data accuracy, and provide instant access to healthcare providers and patients.",
      icon: "🧪",
      link: "/login/lab",
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      features: ["Report Upload", "Quality Control", "Instant Sharing", "Digital Verification"],
      stats: "Partner Labs"
    },
    {
      title: "Hospital Admin",
      description: "Oversee hospital operations, manage user access, monitor system performance, and ensure compliance with healthcare regulations.",
      icon: "🏥",
      link: "/login/admin",
      color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      features: ["User Management", "System Monitoring", "Compliance", "Analytics Dashboard"],
      stats: "Hospitals"
    },
  ];

  return (
    <section style={{
      padding: "100px 20px",
      background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <div style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            color: "#0f172a",
            padding: "8px 16px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "600",
            marginBottom: "16px"
          }}>
            👥 User Roles
          </div>
          <h2 style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: "800",
            color: "#0f172a",
            marginBottom: "16px",
            lineHeight: "1.2"
          }}>
            Choose Your Role
          </h2>
          <p style={{
            fontSize: "1.1rem",
            color: "#64748b",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: "1.6"
          }}>
            Select your role to access personalized features and secure healthcare management tools.
          </p>
        </div>

        {/* Roles Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "32px"
        }}>
          {roles.map((role, index) => (
            <div
              key={index}
              style={{
                background: "white",
                padding: "40px 32px",
                borderRadius: "20px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-8px)";
                e.target.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
              }}
            >
              {/* Background Gradient */}
              <div style={{
                position: "absolute",
                top: "0",
                left: "0",
                right: "0",
                height: "4px",
                background: role.color
              }} />

              {/* Icon */}
              <div style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: role.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                margin: "0 auto 24px",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)"
              }}>
                {role.icon}
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: "1.5rem",
                fontWeight: "800",
                color: "#0f172a",
                marginBottom: "12px",
                textAlign: "center"
              }}>
                {role.title}
              </h3>

              {/* Stats */}
              <div style={{
                fontSize: "0.9rem",
                color: "#667eea",
                fontWeight: "600",
                textAlign: "center",
                marginBottom: "16px"
              }}>
                {role.stats}
              </div>

              {/* Description */}
              <p style={{
                color: "#374151",
                lineHeight: "1.6",
                marginBottom: "24px",
                textAlign: "center",
                fontSize: "0.95rem"
              }}>
                {role.description}
              </p>

              {/* Features */}
              <div style={{ marginBottom: "32px" }}>
                <h4 style={{
                  fontSize: "0.9rem",
                  fontWeight: "700",
                  color: "#0f172a",
                  marginBottom: "12px",
                  textAlign: "center"
                }}>
                  Key Features
                </h4>
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  justifyContent: "center"
                }}>
                  {role.features.map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      style={{
                        background: "rgba(102, 126, 234, 0.1)",
                        color: "#667eea",
                        padding: "4px 12px",
                        borderRadius: "12px",
                        fontSize: "0.8rem",
                        fontWeight: "500"
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Login Button */}
              <Link to={role.link} style={{ textDecoration: "none" }}>
                <button style={{
                  width: "100%",
                  padding: "14px 24px",
                  background: role.color,
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
                }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
                  }}
                >
                  Login as {role.title}
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{
          textAlign: "center",
          marginTop: "80px",
          padding: "40px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "20px",
          color: "white"
        }}>
          <h3 style={{
            fontSize: "1.8rem",
            fontWeight: "800",
            marginBottom: "16px"
          }}>
            New to AarogyaCard?
          </h3>
          <p style={{
            fontSize: "1.1rem",
            marginBottom: "24px",
            opacity: 0.9,
            maxWidth: "500px",
            margin: "0 auto 24px"
          }}>
            Join thousands of healthcare professionals and patients who trust AarogyaCard for secure health data management.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/register/patient" style={{ textDecoration: "none" }}>
              <button style={{
                padding: "12px 24px",
                background: "white",
                color: "#667eea",
                border: "none",
                borderRadius: "12px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                Register as Patient
              </button>
            </Link>
            <Link to="/register/doctor" style={{ textDecoration: "none" }}>
              <button style={{
                padding: "12px 24px",
                background: "rgba(255, 255, 255, 0.2)",
                color: "white",
                border: "2px solid white",
                borderRadius: "12px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
                onMouseEnter={(e) => {
                  e.target.style.background = "white";
                  e.target.style.color = "#667eea";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.2)";
                  e.target.style.color = "white";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Register as Doctor
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
