import React from "react";
import { FaTimes, FaExclamationTriangle } from "react-icons/fa";

export default function ConfirmationModal({
    isOpen,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    type = "primary" // primary, danger
}) {
    if (!isOpen) return null;

    const isDanger = type === "danger";

    return (
        <div style={styles.overlay}>
            <div style={styles.modal} role="dialog" aria-modal="true">
                {/* Header */}
                <div style={styles.header}>
                    <h3 style={{ ...styles.title, color: isDanger ? "#dc2626" : "#1e293b" }}>
                        {isDanger && <FaExclamationTriangle style={{ marginRight: "10px" }} />}
                        {title}
                    </h3>
                    <button onClick={onCancel} style={styles.closeBtn}>
                        <FaTimes />
                    </button>
                </div>

                {/* Body */}
                <div style={styles.body}>
                    <p style={styles.message}>{message}</p>
                </div>

                {/* Footer */}
                <div style={styles.footer}>
                    <button onClick={onCancel} style={styles.cancelBtn}>
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        style={{
                            ...styles.confirmBtn,
                            background: isDanger ? "#dc2626" : "linear-gradient(90deg, #5654ff 0%, #764ba2 100%)",
                            boxShadow: isDanger ? "0 4px 10px rgba(220, 38, 38, 0.3)" : "0 4px 10px rgba(86, 84, 255, 0.3)"
                        }}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        animation: "fadeIn 0.2s ease-out"
    },
    modal: {
        background: "white",
        borderRadius: "12px",
        width: "90%",
        maxWidth: "400px",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        overflow: "hidden",
        animation: "scaleIn 0.2s ease-out"
    },
    header: {
        padding: "16px 20px",
        borderBottom: "1px solid #e2e8f0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#f8fafc"
    },
    title: {
        margin: 0,
        fontSize: "18px",
        fontWeight: "600",
        display: "flex",
        alignItems: "center"
    },
    closeBtn: {
        background: "transparent",
        border: "none",
        color: "#64748b",
        cursor: "pointer",
        fontSize: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4px",
        borderRadius: "4px",
        transition: "background 0.2s"
    },
    body: {
        padding: "20px",
    },
    message: {
        margin: 0,
        color: "#475569",
        fontSize: "15px",
        lineHeight: "1.5"
    },
    footer: {
        padding: "16px 20px",
        background: "#f8fafc",
        borderTop: "1px solid #e2e8f0",
        display: "flex",
        justifyContent: "flex-end",
        gap: "12px"
    },
    cancelBtn: {
        padding: "10px 16px",
        borderRadius: "8px",
        border: "1px solid #cbd5e1",
        background: "white",
        color: "#475569",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "background 0.2s"
    },
    confirmBtn: {
        padding: "10px 16px",
        borderRadius: "8px",
        border: "none",
        color: "white",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
    }
};

/* Add animations to document if not present */
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
`;
document.head.appendChild(styleSheet);
