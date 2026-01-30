
import React from 'react';
import logo from "../assets/logo.png";

export default function AboutUs() {
    return (
        <section id="about" style={{
            padding: "80px 20px",
            background: "#fff",
            position: "relative",
            overflow: "hidden"
        }}>
            <div style={{
                maxWidth: "1200px",
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "60px",
                alignItems: "center"
            }}>
                {/* Content Side */}
                <div>
                    <span style={{
                        color: "#667eea",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        fontSize: "14px",
                        display: "block",
                        marginBottom: "10px"
                    }}>
                        About Us
                    </span>
                    <h2 style={{
                        fontSize: "36px",
                        fontWeight: "800",
                        color: "#0f172a",
                        marginBottom: "24px",
                        lineHeight: "1.2"
                    }}>
                        Revolutionizing India's <br />
                        <span style={{
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}>Digital Healthcare</span>
                    </h2>
                    <p style={{
                        color: "#64748b",
                        fontSize: "18px",
                        lineHeight: "1.7",
                        marginBottom: "20px"
                    }}>
                        AarogyaCard is at the forefront of the National Digital Health Mission, aimed at bridging the gap between patients, healthcare providers, and diagnostic centers.
                    </p>
                    <p style={{
                        color: "#64748b",
                        fontSize: "16px",
                        lineHeight: "1.7",
                        marginBottom: "30px"
                    }}>
                        Our mission is simple: to provide a secure, unified, and universally accessible health profile for every citizen. By leveraging Aadhaar-based verification, we ensure that your medical history is portable, secure, and always available when you need it most.
                    </p>

                    <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "40px",
                        marginTop: "40px"
                    }}>
                        {/* <div>
                            <h3 style={{ fontSize: "32px", fontWeight: "800", color: "#0f172a", marginBottom: "5px" }}></h3>
                            <p style={{ color: "#64748b", fontSize: "14px", fontWeight: "600" }}></p>
                        </div> */}
                        {/* <div>
                            <h3 style={{ fontSize: "32px", fontWeight: "800", color: "#0f172a", marginBottom: "5px" }}>750+</h3>
                            <p style={{ color: "#64748b", fontSize: "14px", fontWeight: "600" }}>Verified Doctors</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: "32px", fontWeight: "800", color: "#0f172a", marginBottom: "5px" }}>200+</h3>
                            <p style={{ color: "#64748b", fontSize: "14px", fontWeight: "600" }}>Partner Labs</p>
                        </div> */}
                    </div>
                </div>

                {/* Image/Visual Side */}
                <div style={{ position: "relative" }}>
                    <div style={{
                        background: "linear-gradient(135deg, #e0e7ff 0%, #fae8ff 100%)",
                        borderRadius: "24px",
                        padding: "40px",
                        position: "relative",
                        zIndex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.05)"
                    }}>
                        {/* LOGO DISPLAY */}
                        <div style={{
                            width: "160px",
                            height: "160px",
                            background: "white",
                            borderRadius: "24px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                            marginBottom: "20px",
                            padding: "10px"
                        }}>
                            <img src={logo} alt="AarogyaCard Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                        </div>
                        <div style={{
                            background: "white",
                            padding: "20px",
                            borderRadius: "16px",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                            marginTop: "20px",
                            textAlign: "center"
                        }}>
                            <h4 style={{ margin: "0 0 10px 0", color: "#0f172a" }}>Verified Health Records</h4>
                            <div style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
                                <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
                            </div>
                        </div>
                    </div>
                    {/* Decorative Blob */}
                    <div style={{
                        position: "absolute",
                        top: "-20px",
                        right: "-20px",
                        width: "100px",
                        height: "100px",
                        background: "#764ba2",
                        borderRadius: "50%",
                        opacity: "0.1",
                        zIndex: 0
                    }}></div>
                </div>
            </div>
        </section>
    );
}
