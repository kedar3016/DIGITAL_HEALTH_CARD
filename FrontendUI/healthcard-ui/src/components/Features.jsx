import "./Features.css";

export default function Features() {
  const features = [
    {
      title: "Digital Health Records",
      description: "Store and access all your medical history in one secure digital card with blockchain-level security and instant verification.",
      icon: "📄",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      benefits: ["Lifetime storage", "Instant access", "Blockchain security"],
      stats: "99.9% Uptime"
    },
    {
      title: "OTP & Biometric Security",
      description: "Multi-factor authentication with Aadhaar OTP and biometric verification ensures your data remains protected at all times.",
      icon: "🔐",
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      benefits: ["Aadhaar verified", "Biometric auth", "Zero-trust security"],
      stats: "Bank-grade Security"
    },
    {
      title: "PDF Medical Reports",
      description: "Upload and download reports in PDF format for easy sharing with doctors and specialists. Compatible with all healthcare systems.",
      icon: "📋",
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      benefits: ["Universal format", "Instant sharing", "Digital signatures"],
      stats: "50K+ Reports/month"
    },
    {
      title: "Emergency Access",
      description: "Grant emergency access to trusted nominees in critical situations with time-limited permissions and automatic revocation.",
      icon: "🚑",
      color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      benefits: ["Life-saving access", "Time-limited", "Auto-revocation"],
      stats: "24/7 Emergency Support"
    },
    {
      title: "Doctor Verification",
      description: "All records are verified by certified medical professionals with digital signatures and tamper-proof blockchain validation.",
      icon: "👨‍⚕️",
      color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      benefits: ["Certified doctors", "Digital signatures", "Tamper-proof"],
      stats: "750+ Verified Doctors"
    },
    {
      title: "Lab Integration",
      description: "Seamlessly connect with certified laboratories for instant test results and diagnostic reports with real-time updates.",
      icon: "🧪",
      color: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      benefits: ["Real-time results", "Certified labs", "Instant delivery"],
      stats: "200+ Partner Labs"
    }
  ];

  return (
    <section id="features" style={{
      padding: "120px 20px",
      background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background Pattern */}
      <div style={{
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        opacity: "0.03",
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "100px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            padding: "12px 24px",
            borderRadius: "30px",
            fontSize: "14px",
            fontWeight: "700",
            marginBottom: "24px",
            boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
            animation: "fadeInUp 1s ease-out"
          }}>
            <span style={{ fontSize: "16px" }}>✨</span>
            Powerful Features
          </div>
          <h2 style={{
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: "900",
            color: "#0f172a",
            marginBottom: "24px",
            lineHeight: "1.1",
            animation: "fadeInUp 1s ease-out 0.2s both"
          }}>
            Why Healthcare Professionals<br />
            <span style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Choose AarogyaCard
            </span>
          </h2>
          <p style={{
            fontSize: "1.2rem",
            color: "#64748b",
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: "1.7",
            animation: "fadeInUp 1s ease-out 0.4s both"
          }}>
            Experience healthcare management reimagined with cutting-edge technology,
            uncompromising security, and seamless integration across the entire healthcare ecosystem.
          </p>
        </div>

        {/* Features Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
          gap: "40px",
          marginBottom: "80px"
        }}>
          {features.map((feature, index) => (
            <div key={index} style={{
              background: "white",
              padding: "50px 40px",
              borderRadius: "24px",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
              textAlign: "center",
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              position: "relative",
              overflow: "hidden",
              animation: `fadeInUp 1s ease-out ${0.6 + index * 0.1}s both`
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-12px) scale(1.02)";
              e.target.style.boxShadow = "0 25px 60px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0) scale(1)";
              e.target.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.08)";
            }}
            >
              {/* Gradient Background */}
              <div style={{
                position: "absolute",
                top: "0",
                left: "0",
                right: "0",
                height: "6px",
                background: feature.color
              }} />

              {/* Floating Icon Background */}
              <div style={{
                position: "absolute",
                top: "-30px",
                right: "-30px",
                width: "80px",
                height: "80px",
                background: feature.color,
                borderRadius: "50%",
                opacity: 0.1,
                animation: "float 4s ease-in-out infinite"
              }} />

              {/* Icon */}
              <div style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                background: feature.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2.5rem",
                margin: "0 auto 30px",
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
                position: "relative",
                zIndex: 2
              }}>
                {feature.icon}
              </div>

              {/* Stats Badge */}
              <div style={{
                display: "inline-block",
                background: "rgba(102, 126, 234, 0.1)",
                color: "#667eea",
                padding: "6px 16px",
                borderRadius: "20px",
                fontSize: "0.8rem",
                fontWeight: "700",
                marginBottom: "20px"
              }}>
                {feature.stats}
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: "1.5rem",
                fontWeight: "800",
                color: "#0f172a",
                marginBottom: "16px",
                position: "relative",
                zIndex: 2
              }}>
                {feature.title}
              </h3>

              {/* Description */}
              <p style={{
                color: "#64748b",
                lineHeight: "1.7",
                fontSize: "1rem",
                marginBottom: "24px",
                position: "relative",
                zIndex: 2
              }}>
                {feature.description}
              </p>

              {/* Benefits */}
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                justifyContent: "center",
                position: "relative",
                zIndex: 2
              }}>
                {feature.benefits.map((benefit, benefitIndex) => (
                  <span
                    key={benefitIndex}
                    style={{
                      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                      color: "#475569",
                      padding: "6px 14px",
                      borderRadius: "16px",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      border: "1px solid rgba(0, 0, 0, 0.05)"
                    }}
                  >
                    ✓ {benefit}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "32px",
          padding: "80px 60px",
          textAlign: "center",
          color: "white",
          animation: "fadeInUp 1s ease-out 1s both"
        }}>
          <h3 style={{
            fontSize: "2.2rem",
            fontWeight: "800",
            marginBottom: "16px"
          }}>
            Ready to Transform Healthcare?
          </h3>
          <p style={{
            fontSize: "1.2rem",
            marginBottom: "40px",
            opacity: 0.9,
            maxWidth: "600px",
            margin: "0 auto 40px"
          }}>
            Join thousands of healthcare professionals who trust AarogyaCard for secure,
            efficient, and innovative healthcare management solutions.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "30px",
            maxWidth: "800px",
            margin: "0 auto"
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "2.5rem",
                fontWeight: "900",
                marginBottom: "8px",
                color: "#a8edea"
              }}>15K+</div>
              <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>Active Patients</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "2.5rem",
                fontWeight: "900",
                marginBottom: "8px",
                color: "#fed6e3"
              }}>750+</div>
              <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>Verified Doctors</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "2.5rem",
                fontWeight: "900",
                marginBottom: "8px",
                color: "#d299c2"
              }}>200+</div>
              <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>Partner Labs</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "2.5rem",
                fontWeight: "900",
                marginBottom: "8px",
                color: "#fbbf24"
              }}>4.9★</div>
              <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>User Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
    </section>
  );
}
