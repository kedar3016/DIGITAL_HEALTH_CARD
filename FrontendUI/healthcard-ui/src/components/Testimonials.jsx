export default function Testimonials() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Patient",
      message: "AarogyaCard has revolutionized how I manage my health records. No more lost papers or forgotten appointments. Everything is secure and accessible with just my Aadhaar number.",
      avatar: "👩‍💼",
      rating: 5,
      location: "Mumbai, Maharashtra"
    },
    {
      name: "Dr. Rajesh Kumar",
      role: "Cardiologist",
      message: "The verification system ensures data integrity. I can trust that all patient records are authentic and up-to-date. This has improved patient care significantly.",
      avatar: "👨‍⚕️",
      rating: 5,
      location: "Delhi, NCR"
    },
    {
      name: "Dr. Meera Patel",
      role: "General Physician",
      message: "Emergency access feature is invaluable. In critical situations, we can quickly access patient history without compromising privacy protocols.",
      avatar: "👩‍⚕️",
      rating: 5,
      location: "Ahmedabad, Gujarat"
    },
    {
      name: "Suresh Lab Technician",
      role: "Lab Manager",
      message: "Uploading reports is seamless, and the PDF format ensures compatibility across all healthcare systems. Integration has never been easier.",
      avatar: "👨‍🔬",
      rating: 5,
      location: "Bangalore, Karnataka"
    },
    {
      name: "Anita Gupta",
      role: "Patient",
      message: "The nominee emergency access saved my mother's life. When she had an accident, doctors could access her medical history instantly. Thank you!",
      avatar: "👩‍💻",
      rating: 5,
      location: "Pune, Maharashtra"
    },
    {
      name: "Dr. Vikram Singh",
      role: "Neurologist",
      message: "Blockchain-level security gives me confidence in the platform. Patient data privacy is paramount, and AarogyaCard delivers on that promise.",
      avatar: "👨‍⚕️",
      rating: 5,
      location: "Chennai, Tamil Nadu"
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{
        color: i < rating ? "#fbbf24" : "#e5e7eb",
        fontSize: "16px"
      }}>
        ★
      </span>
    ));
  };

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
            💬 User Stories
          </div>
          <h2 style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: "800",
            color: "#0f172a",
            marginBottom: "16px",
            lineHeight: "1.2"
          }}>
            Trusted by Healthcare Professionals
          </h2>
          <p style={{
            fontSize: "1.1rem",
            color: "#64748b",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: "1.6"
          }}>
            See what doctors, patients, and healthcare providers are saying about AarogyaCard.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "32px",
          marginBottom: "60px"
        }}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              style={{
                background: "white",
                padding: "32px",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                position: "relative",
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
              {/* Quote Icon */}
              <div style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                fontSize: "24px",
                color: "#e5e7eb",
                opacity: 0.6
              }}>
                "
              </div>

              {/* Rating */}
              <div style={{ marginBottom: "16px" }}>
                {renderStars(testimonial.rating)}
              </div>

              {/* Message */}
              <p style={{
                fontStyle: "italic",
                color: "#374151",
                lineHeight: "1.6",
                marginBottom: "24px",
                fontSize: "0.95rem"
              }}>
                "{testimonial.message}"
              </p>

              {/* User Info */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  color: "white"
                }}>
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 style={{
                    fontSize: "1rem",
                    fontWeight: "700",
                    color: "#0f172a",
                    margin: "0 0 2px 0"
                  }}>
                    {testimonial.name}
                  </h4>
                  <p style={{
                    fontSize: "0.85rem",
                    color: "#667eea",
                    fontWeight: "600",
                    margin: "0 0 2px 0"
                  }}>
                    {testimonial.role}
                  </p>
                  <p style={{
                    fontSize: "0.8rem",
                    color: "#6b7280",
                    margin: "0"
                  }}>
                    📍 {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "20px",
          padding: "60px 40px",
          textAlign: "center",
          color: "white"
        }}>
          <h3 style={{
            fontSize: "2rem",
            fontWeight: "800",
            marginBottom: "16px"
          }}>
            Join Our Growing Community
          </h3>
          <p style={{
            fontSize: "1.1rem",
            marginBottom: "40px",
            opacity: 0.9,
            maxWidth: "600px",
            margin: "0 auto 40px"
          }}>
            Thousands of healthcare professionals and patients trust AarogyaCard for secure health data management.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "32px",
            maxWidth: "800px",
            margin: "0 auto"
          }}>
            <div>
              <div style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                marginBottom: "8px"
              }}>15K+</div>
              <div style={{
                fontSize: "0.9rem",
                opacity: 0.8
              }}>Active Patients</div>
            </div>
            <div>
              <div style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                marginBottom: "8px"
              }}>750+</div>
              <div style={{
                fontSize: "0.9rem",
                opacity: 0.8
              }}>Verified Doctors</div>
            </div>
            <div>
              <div style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                marginBottom: "8px"
              }}>200+</div>
              <div style={{
                fontSize: "0.9rem",
                opacity: 0.8
              }}>Partner Labs</div>
            </div>
            <div>
              <div style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                marginBottom: "8px"
              }}>4.9★</div>
              <div style={{
                fontSize: "0.9rem",
                opacity: 0.8
              }}>User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
