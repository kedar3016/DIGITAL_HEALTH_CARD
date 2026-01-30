import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

/**
 * A reusable confirmation modal with a responsive, glassmorphism design.
 * 
 * @param {boolean} isOpen - Whether the modal is visible
 * @param {string} title - The title of the modal
 * @param {string} message - The main message text
 * @param {function} onConfirm - Callback for the confirm action
 * @param {function} onCancel - Callback for the cancel action
 * @param {string} confirmText - Text for the confirm button (default: "Confirm")
 * @param {string} cancelText - Text for the cancel button (default: "Cancel")
 * @param {string} type - 'danger' | 'info' (default: 'danger') - affects styling
 */
const ConfirmationModal = ({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = "Confirm",
    cancelText = "Cancel",
    type = "danger"
}) => {
    if (!isOpen) return null;

    const isDanger = type === 'danger';
    const iconColor = isDanger ? '#ef4444' : '#3b82f6';
    const confirmBtnBg = isDanger ? '#ef4444' : '#3b82f6';

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                {/* Icon Header */}
                <div style={styles.iconContainer}>
                    <div style={{ ...styles.iconCircle, background: `${iconColor}20` }}>
                        <FaExclamationTriangle size={24} color={iconColor} />
                    </div>
                </div>

                {/* Content */}
                <div style={styles.content}>
                    <h3 style={styles.title}>{title}</h3>
                    <p style={styles.message}>{message}</p>
                </div>

                {/* Actions */}
                <div style={styles.actions}>
                    <button onClick={onCancel} style={styles.cancelBtn}>
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        style={{ ...styles.confirmBtn, background: confirmBtnBg }}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        transform: 'scale(1)',
        animation: 'slideDown 0.2s ease-out',
    },
    iconContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '16px',
    },
    iconCircle: {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        textAlign: 'center',
        marginBottom: '24px',
    },
    title: {
        fontSize: '18px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '8px',
        marginTop: 0,
    },
    message: {
        fontSize: '14px',
        color: '#6b7280',
        margin: 0,
        lineHeight: '1.5',
    },
    actions: {
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
    },
    cancelBtn: {
        flex: 1,
        padding: '10px 16px',
        borderRadius: '8px',
        border: '1px solid #d1d5db',
        backgroundColor: 'white',
        color: '#374151',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    confirmBtn: {
        flex: 1,
        padding: '10px 16px',
        borderRadius: '8px',
        border: 'none',
        color: 'white',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'opacity 0.2s',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    }
};

export default ConfirmationModal;
