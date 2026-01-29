export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Register & Verify",
      description: "Create your account and verify your identity using Aadhaar OTP for secure access to the platform.",
      icon: "📱",
      color: "#667eea"
    },
    {
      step: "02",
      title: "Upload Records",
      description: "Healthcare providers upload medical reports directly to your secure digital health card.",
      icon: "📤",
      color: "#764ba2"
    },
    {
      step: "03",
      title: "Access Anytime",
      description: "View, download, and share your complete medical history securely from any device.",
      icon: "🌐",
      color: "#f093fb"
    },
    {
      step: "04",
      title: "Emergency Sharing",
      description: "Grant temporary access to trusted contacts during medical emergencies.",
      icon: "🚨",
      color: "#4facfe"
    },
  ];

  return (
    <section style={{
      padding: "100px 20px",
      background: "white"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <div style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            color: "white",
            padding: "8px 16px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "600",
            marginBottom: "16px"
          }}>
            🚀 Simple Process
          </div>
          <h2 style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: "800",
            color: "#0f172a",
            marginBottom: "16px",
            lineHeight: "1.2"
          }}>
            How AarogyaCard Works
          </h2>
          <p style={{
            fontSize: "1.1rem",
            color: "#64748b",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: "1.6"
          }}>
            Get started with your digital health journey in just four simple steps.
          </p>
        </div>

        {/* Steps Container */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "40px",
          position: "relative"
        }}>
          {/* Connection Line */}
          <div style={{
            position: "absolute",
            top: "80px",
            left: "50%",
            right: "50%",
            height: "2px",
            background: "linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
            zIndex: 0,
            display: "none"
          }}></div>

          {steps.map((step, index) => (
            <div key={index} style={{
              textAlign: "center",
              position: "relative",
              zIndex: 1,
              background: "white",
              padding: "40px 30px",
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-8px)";
              e.target.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.12)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
            }}>
              {/* Step Number */}
              <div style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${step.color}20, ${step.color}10)`,
                border: `3px solid ${step.color}`,
                color: step.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                fontWeight: "800",
                margin: "0 auto 24px",
                position: "relative"
              }}>
                {step.step}
                {/* Icon */}
                <div style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  width: "32px",
                  height: "32px",
                  background: step.color,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "14px"
                }}>
                  {step.icon}
                </div>
              </div>

              {/* Content */}
              <h3 style={{
                fontSize: "1.25rem",
                fontWeight: "700",
                color: "#0f172a",
                marginBottom: "12px"
              }}>
                {step.title}
              </h3>
              <p style={{
                color: "#64748b",
                lineHeight: "1.6",
                fontSize: "0.95rem"
              }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div style={{
          textAlign: "center",
          marginTop: "80px",
          padding: "60px 40px",
          background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)",
          borderRadius: "20px",
          border: "1px solid rgba(0, 0, 0, 0.05)"
        }}>
          <h3 style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#0f172a",
            marginBottom: "16px"
          }}>
            Ready to Get Started?
          </h3>
          <p style={{
            fontSize: "1.1rem",
            color: "#64748b",
            marginBottom: "32px",
            maxWidth: "500px",
            margin: "0 auto 32px"
          }}>
            Join thousands of users who trust AarogyaCard for their healthcare management needs.
          </p>
          <div style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap"
          }}>
            <a
              href="/login/patient"
              style={{
                padding: "14px 28px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                textDecoration: "none",
                borderRadius: "10px",
                fontWeight: "600",
                fontSize: "16px",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)",
                display: "inline-block"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 30px rgba(102, 126, 234, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 20px rgba(102, 126, 234, 0.3)";
              }}
            >
              Start Your Journey
            </a>
            <a
              href="/login/doctor"
              style={{
                padding: "14px 28px",
                background: "transparent",
                color: "#667eea",
                textDecoration: "none",
                border: "2px solid #667eea",
                borderRadius: "10px",
                fontWeight: "600",
                fontSize: "16px",
                transition: "all 0.3s ease",
                display: "inline-block"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#667eea";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#667eea";
              }}
            >
              Join as Healthcare Provider
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
