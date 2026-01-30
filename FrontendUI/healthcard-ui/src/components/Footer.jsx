export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
      { name: "Blog", href: "#" }
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" }
    ],
    resources: [
      { name: "API Documentation", href: "#" },
      { name: "Developer Portal", href: "#" },
      { name: "Security", href: "#" },
      { name: "Compliance", href: "#" }
    ]
  };

  const socialLinks = [
    { name: "Twitter", icon: "🐦", href: "#" },
    { name: "LinkedIn", icon: "💼", href: "#" },
    { name: "Facebook", icon: "📘", href: "#" },
    { name: "Instagram", icon: "📷", href: "#" }
  ];

  return (
    <footer style={{
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      color: "white",
      padding: "80px 20px 40px",
      marginTop: "auto"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Main Footer Content */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "40px",
          marginBottom: "60px"
        }}>
          {/* Company Info */}
          <div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px"
            }}>
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px"
              }}>
                🏥
              </div>
              <h3 style={{
                fontSize: "1.5rem",
                fontWeight: "800",
                margin: "0",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>
                AarogyaCard
              </h3>
            </div>
            <p style={{
              color: "#cbd5e1",
              lineHeight: "1.6",
              marginBottom: "24px",
              fontSize: "0.95rem"
            }}>
              Revolutionizing healthcare with secure, digital health cards powered by Aadhaar verification.
              Connecting patients, doctors, and healthcare providers nationwide.
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    transition: "all 0.3s ease",
                    textDecoration: "none",
                    color: "white"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(255, 255, 255, 0.1)";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 style={{
              fontSize: "1.1rem",
              fontWeight: "700",
              marginBottom: "20px",
              color: "#f1f5f9"
            }}>
              Company
            </h4>
            <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
              {footerLinks.company.map((link, index) => (
                <li key={index} style={{ marginBottom: "12px" }}>
                  <a
                    href={link.href}
                    style={{
                      color: "#cbd5e1",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      transition: "color 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#667eea";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#cbd5e1";
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 style={{
              fontSize: "1.1rem",
              fontWeight: "700",
              marginBottom: "20px",
              color: "#f1f5f9"
            }}>
              Support
            </h4>
            <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
              {footerLinks.support.map((link, index) => (
                <li key={index} style={{ marginBottom: "12px" }}>
                  <a
                    href={link.href}
                    style={{
                      color: "#cbd5e1",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      transition: "color 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#667eea";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#cbd5e1";
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 style={{
              fontSize: "1.1rem",
              fontWeight: "700",
              marginBottom: "20px",
              color: "#f1f5f9"
            }}>
              Resources
            </h4>
            <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
              {footerLinks.resources.map((link, index) => (
                <li key={index} style={{ marginBottom: "12px" }}>
                  <a
                    href={link.href}
                    style={{
                      color: "#cbd5e1",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      transition: "color 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#667eea";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#cbd5e1";
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          paddingTop: "40px",
          marginBottom: "40px"
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            textAlign: "center"
          }}>
            <div>
              <div style={{
                fontSize: "1.2rem",
                marginBottom: "8px",
                color: "#667eea"
              }}>
                📧
              </div>
              <div style={{
                fontSize: "0.9rem",
                color: "#cbd5e1"
              }}>
                support@aarogyacard.in
              </div>
            </div>
            <div>
              <div style={{
                fontSize: "1.2rem",
                marginBottom: "8px",
                color: "#667eea"
              }}>
                📞
              </div>
              <div style={{
                fontSize: "0.9rem",
                color: "#cbd5e1"
              }}>
                +91 1800-XXX-XXXX
              </div>
            </div>
            <div>
              <div style={{
                fontSize: "1.2rem",
                marginBottom: "8px",
                color: "#667eea"
              }}>
                📍
              </div>
              <div style={{
                fontSize: "0.9rem",
                color: "#cbd5e1"
              }}>
                New Delhi, India
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          paddingTop: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px"
        }}>
          <div style={{
            fontSize: "0.85rem",
            color: "#94a3b8"
          }}>
            © {currentYear} AarogyaCard. All rights reserved.
          </div>
          <div style={{
            display: "flex",
            gap: "24px",
            flexWrap: "wrap"
          }}>

          </div>
        </div>
      </div>
    </footer>
  );
}