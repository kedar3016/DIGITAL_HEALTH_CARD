import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      overflow: "hidden",
      padding: "120px 20px 100px"
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "10%",
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        background: "rgba(255, 255, 255, 0.1)",
        animation: "float 6s ease-in-out infinite"
      }} />
      <div style={{
        position: "absolute",
        top: "60%",
        right: "15%",
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        background: "rgba(255, 255, 255, 0.08)",
        animation: "float 8s ease-in-out infinite reverse"
      }} />
      <div style={{
        position: "absolute",
        bottom: "20%",
        left: "20%",
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        background: "rgba(255, 255, 255, 0.06)",
        animation: "float 7s ease-in-out infinite"
      }} />

      {/* Floating Medical Icons */}
      <div style={{
        position: "absolute",
        top: "20%",
        right: "10%",
        fontSize: "3rem",
        animation: "bounce 3s ease-in-out infinite",
        opacity: 0.8
      }}>
        🏥
      </div>
      <div style={{
        position: "absolute",
        top: "40%",
        left: "5%",
        fontSize: "2.5rem",
        animation: "bounce 4s ease-in-out infinite",
        opacity: 0.7
      }}>
        💊
      </div>
      <div style={{
        position: "absolute",
        bottom: "30%",
        right: "5%",
        fontSize: "2rem",
        animation: "bounce 5s ease-in-out infinite",
        opacity: 0.6
      }}>
        🩺
      </div>

      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        textAlign: "center",
        color: "white",
        position: "relative",
        zIndex: 2
      }}>
        {/* Trust Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          padding: "12px 24px",
          borderRadius: "50px",
          marginBottom: "32px",
          fontSize: "0.9rem",
          fontWeight: "600"
        }}>
          <span style={{ color: "#fbbf24" }}>⭐</span>
          Trusted by Healthcare Professionals
        </div>

        {/* Main Headline */}
        <h1 style={{
          fontSize: "clamp(3rem, 8vw, 6rem)",
          fontWeight: "900",
          marginBottom: "24px",
          lineHeight: "1.1",
          textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          animation: "fadeInUp 1s ease-out"
        }}>
          Your Health,<br />
          <span style={{
            background: "linear-gradient(135deg, #a8edea, #fed6e3, #d299c2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Digitally Secured
          </span>
        </h1>

        {/* Subheadline */}
        <p style={{
          fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
          marginBottom: "48px",
          lineHeight: "1.6",
          opacity: 0.9,
          maxWidth: "600px",
          margin: "0 auto 48px",
          animation: "fadeInUp 1s ease-out 0.2s both"
        }}>
          Experience the future of healthcare with AarogyaCard. Secure, instant access to your medical records,
          verified by Aadhaar, trusted by doctors nationwide.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "80px",
          animation: "fadeInUp 1s ease-out 0.4s both"
        }}>
          <Link to="/login/patient" style={{ textDecoration: "none" }}>
            <button style={{
              padding: "18px 40px",
              background: "white",
              color: "#667eea",
              border: "none",
              borderRadius: "50px",
              fontSize: "1.1rem",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px"
            }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
              }}
            >
              <span>👤</span>
              Access My Health Card
            </button>
          </Link>

          <Link to="/login/doctor" style={{ textDecoration: "none" }}>
            <button style={{
              padding: "18px 40px",
              background: "rgba(255, 255, 255, 0.1)",
              color: "white",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "50px",
              fontSize: "1.1rem",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px"
            }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
                e.target.style.borderColor = "rgba(255, 255, 255, 0.5)";
                e.target.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.1)";
                e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              <span>👨‍⚕️</span>
              Doctor Login
            </button>
          </Link>
        </div>

        {/* Stats Section */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "40px",
          maxWidth: "800px",
          margin: "0 auto",
          animation: "fadeInUp 1s ease-out 0.6s both"
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "2.5rem",
              fontWeight: "900",
              marginBottom: "8px",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)"
            }}>

            </div>
            <div style={{
              fontSize: "0.9rem",
              opacity: 0.8,
              fontWeight: "500"
            }}>

            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "2.5rem",
              fontWeight: "900",
              marginBottom: "8px",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)"
            }}>

            </div>
            <div style={{
              fontSize: "0.9rem",
              opacity: 0.8,
              fontWeight: "500"
            }}>

            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "2.5rem",
              fontWeight: "900",
              marginBottom: "8px",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)"
            }}>

            </div>
            <div style={{
              fontSize: "0.9rem",
              opacity: 0.8,
              fontWeight: "500"
            }}>

            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "2.5rem",
              fontWeight: "900",
              marginBottom: "8px",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)"
            }}>

            </div>
            <div style={{
              fontSize: "0.9rem",
              opacity: 0.8,
              fontWeight: "500"
            }}>

            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div style={{
        position: "absolute",
        bottom: "40px",
        left: "50%",
        transform: "translateX(-50%)",
        animation: "bounce 2s infinite",
        cursor: "pointer"
      }}
        onClick={() => {
          document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <div style={{
          width: "24px",
          height: "36px",
          border: "2px solid rgba(255, 255, 255, 0.5)",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "center",
          padding: "4px 0"
        }}>
          <div style={{
            width: "2px",
            height: "8px",
            background: "white",
            borderRadius: "1px",
            animation: "scrollDown 2s infinite"
          }} />
        </div>
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }

          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes scrollDown {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(8px); opacity: 0; }
          }
        `}
      </style>
    </section>
  );
}
