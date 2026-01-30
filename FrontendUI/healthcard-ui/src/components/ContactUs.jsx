
import React, { useState } from 'react';

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for contacting us! We will get back to you shortly.");
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <section id="contact" style={{
            padding: "80px 20px",
            background: "#f8fafc",
        }}>
            <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: "50px" }}>
                    <span style={{
                        color: "#667eea",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        fontSize: "14px",
                        display: "block",
                        marginBottom: "10px"
                    }}>
                        Get In Touch
                    </span>
                    <h2 style={{
                        fontSize: "36px",
                        fontWeight: "800",
                        color: "#0f172a",
                    }}>
                        Contact Us
                    </h2>
                    <p style={{
                        color: "#64748b",
                        fontSize: "16px",
                        maxWidth: "600px",
                        margin: "15px auto 0"
                    }}>
                        Have questions about AarogyaCard? Need support or want to partner with us? We're here to help.
                    </p>
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "40px",
                    background: "white",
                    borderRadius: "24px",
                    padding: "40px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
                }}>
                    {/* Contact Actions */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                        <div>
                            <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "15px", color: "#0f172a" }}>Contact Information</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                    <div style={{ width: "40px", height: "40px", background: "#f1f5f9", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>📍</div>
                                    <span style={{ color: "#475569" }}>New Delhi, India</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                    <div style={{ width: "40px", height: "40px", background: "#f1f5f9", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>📧</div>
                                    <span style={{ color: "#475569" }}>support@aarogyacard.in</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                    <div style={{ width: "40px", height: "40px", background: "#f1f5f9", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>📞</div>
                                    <span style={{ color: "#475569" }}>+91 1800-123-4567</span>
                                </div>
                            </div>
                        </div>

                        <div style={{
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            padding: "30px",
                            borderRadius: "16px",
                            color: "white"
                        }}>
                            <h4 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "10px" }}>Need Instant Help?</h4>
                            <p style={{ fontSize: "14px", opacity: "0.9", marginBottom: "20px" }}>Our AI support assistant is available 24/7 to answer your queries.</p>
                            <button style={{
                                background: "white",
                                color: "#667eea",
                                border: "none",
                                padding: "10px 20px",
                                borderRadius: "8px",
                                fontWeight: "600",
                                cursor: "pointer"
                            }}>
                                Chat Now
                            </button>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                style={{ width: "100%", padding: "12px 15px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "15px" }}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                style={{ width: "100%", padding: "12px 15px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "15px" }}
                            />
                        </div>
                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "12px 15px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "15px" }}
                        />
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            rows="5"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "12px 15px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "15px", resize: "vertical", fontFamily: "inherit" }}
                        ></textarea>
                        <button type="submit" style={{
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "white",
                            border: "none",
                            padding: "15px",
                            borderRadius: "10px",
                            fontSize: "16px",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "opacity 0.2s"
                        }}>
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
