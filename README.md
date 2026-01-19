# 📌 DIGITAL HEALTH CARD – Today's Work Summary

## ✅ 1. System Design Finalization

Today, the overall system architecture was finalized based on the updated project requirements:

### ✔ Roles & Permissions
- **Patient**
  - Aadhaar-based registration (OTP Verification)
  - View all medical reports
  - Add nominee for emergency access
  - Download Smart Health Card

- **Nominee**
  - Emergency login using PIN
  - Can view only limited patient details + latest report

- **Doctor**
  - Register on the platform
  - Access to patient records only after **Admin approval**

- **Lab Technician**
  - Can upload new medical reports
  - Cannot view past reports

- **Admin**
  - Sole responsibility: **Verify and Approve Doctor Registration**
  - No control over patient or lab accounts

---


## ✅ 2. Aadhaar-Based Registration Flow Added

Completed:
- Aadhaar number input
- OTP verification flow
- Auto-fill user details from Aadhaar API
- Creation of Patient Profile after verification

This ensures **verified identity onboarding** for all patients.
