import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { User, Phone, Calendar, MapPin, Mail, Droplet, Users, Heart, ArrowLeft, Loader2, Key } from "lucide-react";

export default function PatientRegister() {
  const [step, setStep] = useState(1); // 1: Aadhaar & OTP, 2: Registration Form
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    bloodGroup: "",
    nomineeName: "",
    nomineeRelation: "",
    nomineePhone: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formatAadhaar = (value) => {
    const digits = value.replace(/\D/g, '');
    return digits.slice(0, 12);
  };

  const handleAadhaarChange = (e) => {
    const formatted = formatAadhaar(e.target.value);
    setAadhaarNumber(formatted);
  };

  const sendOtp = async () => {
    if (!aadhaarNumber || aadhaarNumber.length !== 12) {
      setError("Please enter a valid 12-digit Aadhaar number");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await api.post("/api/aadhaar/send-otp", {
        aadhaarNumber: Number(aadhaarNumber)
      });
      setOtpSent(true);
      setError("");
    } catch (err) {
      console.error("OTP send failed", err);
      setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/api/aadhaar/verify-otp", {
        aadhaarNumber: Number(aadhaarNumber),
        otp: otp
      });

      const patientData = response.data || {};

      setFormData(prev => ({
        ...prev,
        name: patientData.name || "",
        phone: patientData.mobile ? patientData.mobile.toString() : "",
        dateOfBirth: patientData.dateOfBirth?.split("T")[0] || "",
        gender: patientData.gender || "",
        address: patientData.address || ""
      }));

      setStep(2);
      setError("");
    } catch (err) {
      console.error("OTP verification failed", err);
      setError(err.response?.data?.message || "OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const register = async () => {
    // Validation
    if (!formData.email || !formData.bloodGroup || !formData.nomineeName || !formData.nomineeRelation || !formData.nomineePhone) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await api.post("/api/Patients/register", {
        aadhaarNumber: Number(aadhaarNumber),
        name: formData.name,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        address: formData.address,
        email: formData.email,
        bloodGroup: formData.bloodGroup,
        phoneNumber: Number(formData.phone),
        nomineeName: formData.nomineeName,
        nomineeRelation: formData.nomineeRelation,
        nomineePhone: Number(formData.nomineePhone)
      });

      alert("Registration successful! You can now access your account.");
      navigate("/login/patient");
    } catch (err) {
      console.error("Registration failed", err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
      if (err.response?.data?.errors) {
        // rough formatting for validation errors
        const msgs = Object.values(err.response.data.errors).flat().join(", ");
        if (msgs) setError(msgs);
      }
    } finally {
      setLoading(false);
    }
  };

  const goBackToStep1 = () => {
    setStep(1);
    setOtp("");
    setOtpSent(false);
    setError("");
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-pink-50 flex items-center justify-center p-4 font-sans">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative overflow-hidden p-8 border border-white/50 backdrop-blur-sm">

          <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-teal-200 to-pink-200 rounded-full flex items-center justify-center text-white text-3xl shadow-lg">
            <User size={32} />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Patient Registration</h1>
            <p className="text-gray-500">Step 1: Verify Identity</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm border border-red-100 flex items-center gap-2">
              <span className="font-bold">!</span> {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Aadhaar Number</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter 12-digit Aadhaar number"
                  value={aadhaarNumber}
                  onChange={handleAadhaarChange}
                  disabled={loading || otpSent}
                  maxLength={12}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-200 focus:border-teal-400 outline-none transition-all pl-10 tracking-widest font-mono"
                />
                <Key className="absolute left-3 top-3.5 text-gray-400" size={18} />
              </div>
            </div>

            {otpSent && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">One Time Password</label>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  disabled={loading}
                  maxLength={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-200 focus:border-teal-400 outline-none transition-all text-center tracking-[0.5em] font-mono text-lg"
                />
                <p className="text-xs text-gray-400 mt-2 text-center">OTP sent to registered mobile number</p>
              </div>
            )}

            {!otpSent ? (
              <button
                onClick={sendOtp}
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-teal-400 to-teal-500 text-white rounded-xl font-semibold shadow-lg shadow-teal-200 hover:shadow-teal-300 transform hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Send OTP"}
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={goBackToStep1}
                  disabled={loading}
                  className="flex-1 py-3.5 bg-gray-100 text-gray-600 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={18} /> Back
                </button>
                <button
                  onClick={verifyOtp}
                  disabled={loading}
                  className="flex-1 py-3.5 bg-gradient-to-r from-teal-400 to-teal-500 text-white rounded-xl font-semibold shadow-lg shadow-teal-200 hover:shadow-teal-300 transform hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : "Verify & Continue"}
                </button>
              </div>
            )}
          </div>

          <div className="mt-8 text-center pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <a href="/login/patient" className="text-teal-600 font-semibold hover:text-teal-700">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Step 2
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-pink-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative overflow-hidden p-8 border border-white/50 backdrop-blur-sm max-h-[90vh] overflow-y-auto custom-scrollbar">

        <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-teal-200 to-pink-200 rounded-full flex items-center justify-center text-white text-3xl shadow-lg">
          <User size={32} />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Complete Registration</h1>
          <p className="text-gray-500">Step 2: Confirm Details</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm border border-red-100 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="font-bold">!</span> {error}
            </div>
            {(error.includes("already registered") || error.includes("already exists")) && (
              <a
                href="/login/patient"
                className="text-red-700 font-semibold underline hover:text-red-800 ml-5 text-xs"
              >
                Go to Login Page &rarr;
              </a>
            )}
          </div>
        )}

        <div className="space-y-8">
          {/* Read Only Section */}
          <div className="bg-gray-50/80 p-6 rounded-2xl border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400"></span> Verified from Aadhaar
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">Full Name</label>
                <div className="bg-white p-3 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium flex items-center gap-2">
                  <User size={16} className="text-gray-400" /> {formData.name}
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">Phone (Linked)</label>
                <div className="bg-white p-3 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium flex items-center gap-2">
                  <Phone size={16} className="text-gray-400" /> {formData.phone || "Not linked"}
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">Date of Birth</label>
                <div className="bg-white p-3 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium flex items-center gap-2">
                  <Calendar size={16} className="text-gray-400" /> {formData.dateOfBirth}
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">Gender</label>
                <div className="bg-white p-3 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium flex items-center gap-2">
                  <Users size={16} className="text-gray-400" /> {formData.gender}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-gray-500 font-medium mb-1 block">Address</label>
                <div className="bg-white p-3 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium flex items-center gap-2">
                  <MapPin size={16} className="text-gray-400" /> {formData.address}
                </div>
              </div>
            </div>
          </div>

          {/* Editable Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 border-t pt-6">
              Additional Details
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-200 focus:border-teal-400 outline-none transition-all pl-10"
                  />
                  <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Group *</label>
                <div className="relative">
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-200 focus:border-teal-400 outline-none transition-all pl-10 appearance-none bg-white"
                  >
                    <option value="">Select Group</option>
                    {bloodGroups.map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                  <Droplet className="absolute left-3 top-3.5 text-gray-400" size={18} />
                </div>
              </div>
            </div>
          </div>

          {/* Nominee Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 border-t pt-6">
              Nominee Details
            </h3>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nominee Name *</label>
                <input
                  type="text"
                  name="nomineeName"
                  placeholder="Full Name"
                  value={formData.nomineeName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-200 focus:border-teal-400 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Relation *</label>
                <select
                  name="nomineeRelation"
                  value={formData.nomineeRelation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-200 focus:border-teal-400 outline-none transition-all bg-white"
                >
                  <option value="">Select Relation</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Parent">Parent</option>
                  <option value="Child">Child</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nominee Phone *</label>
                <input
                  type="tel"
                  name="nomineePhone"
                  placeholder="Phone Number"
                  value={formData.nomineePhone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-200 focus:border-teal-400 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <button
            onClick={register}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-teal-400 to-teal-500 text-white rounded-xl font-bold text-lg shadow-xl shadow-teal-200 hover:shadow-teal-300 transform hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : "Complete Registration"}
          </button>

          <div className="mt-6 text-center pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <a href="/login/patient" className="text-teal-600 font-semibold hover:text-teal-700">
                Login here
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}