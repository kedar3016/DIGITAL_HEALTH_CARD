import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";

// Patient
import PatientLogin from "./pages/patient/PatientLogin";
import PatientRegister from "./pages/patient/PatientRegister";
import VerifyOtp from "./pages/patient/VerifyOtp";
import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientProfile from "./pages/patient/PatientProfile";
import PatientReports from "./pages/patient/PatientReports";
import DownloadHealthCard from "./pages/patient/DownloadHealthCard";

// Doctor
import DoctorLogin from "./pages/login/DoctorLogin";
import DoctorForgotPassword from "./pages/login/DoctorForgotPassword";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";

import DoctorRegister from "./pages/doctor/DoctorRegister";

// Lab Technician
import LabTechLogin from "./pages/login/LabTechLogin";
import LabTechForgotPassword from "./pages/login/LabTechForgotPassword";
import LabTechRegister from "./pages/labtech/LabTechRegister";

import LabTechDashboard from "./pages/labtech/LabTechDashboard";

// Admin
import AdminLogin from "./pages/login/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Auth
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🌐 Public */}
        <Route path="/" element={<Landing />} />

        {/* 👤 Patient */}
        <Route path="/login/patient" element={<PatientLogin />} />
        <Route path="/register/patient" element={<PatientRegister />} />
        <Route path="/patient/verify-otp" element={<VerifyOtp />} />
        <Route
          path="/patient/dashboard"
          element={
            <ProtectedRoute role="Patient">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/profile"
          element={
            <ProtectedRoute role="Patient">
              <PatientProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/reports"
          element={
            <ProtectedRoute role="Patient">
              <PatientReports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/health-card"
          element={
            <ProtectedRoute role="Patient">
              <DownloadHealthCard />
            </ProtectedRoute>
          }
        />

        {/* 🧪 Lab Technician */}
        <Route path="/login/lab" element={<LabTechLogin />} />
        <Route path="/login/lab/forgot-password" element={<LabTechForgotPassword />} />
        <Route path="/register/lab" element={<LabTechRegister />} />

        <Route
          path="/lab/dashboard"
          element={
            <ProtectedRoute role="LabTechnician">
              <LabTechDashboard />
            </ProtectedRoute>
          }
        />

        {/* 👨‍⚕️ Doctor */}
        <Route path="/login/doctor" element={<DoctorLogin />} />
        <Route path="/login/doctor/forgot-password" element={<DoctorForgotPassword />} />
        <Route path="/doctor/register" element={<DoctorRegister />} />

        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute role="Doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        {/* 🏥 Admin */}
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="Admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
