# AarogyaCard Frontend

A production-ready React.js frontend for the AarogyaCard Digital Health Card system, featuring an exceptional, modern landing page inspired by eka.care.

## ✨ Exceptional Landing Page Features

### 🎨 **Premium Design System**
- **Healthcare Color Palette**: Professional blue/purple gradients (#667eea, #764ba2)
- **Advanced Animations**: Smooth CSS animations, floating elements, and micro-interactions
- **Glassmorphism Effects**: Modern backdrop blur and transparency effects
- **Responsive Typography**: Clamp() functions for perfect scaling across devices
- **Gradient Backgrounds**: Dynamic, eye-catching visual elements

### 🚀 **Hero Section Excellence**
- **Full-Screen Impact**: Immersive hero with animated background elements
- **Trust Indicators**: Social proof badges and user statistics
- **Dual CTA Strategy**: Separate buttons for patients and healthcare professionals
- **Floating Medical Icons**: Animated healthcare-themed decorative elements
- **Scroll Indicators**: Interactive navigation hints

### 💎 **Enhanced Features Showcase**
- **6 Comprehensive Features**: Digital records, security, PDF reports, emergency access, doctor verification, lab integration
- **Benefit Tags**: Key feature highlights for each capability
- **Statistics Integration**: Real-time metrics and performance indicators
- **Hover Animations**: Smooth scale and elevation effects
- **Color-Coded Cards**: Unique gradient themes for visual distinction

### 👥 **Advanced User Roles**
- **4 Role Categories**: Patient, Doctor, Lab Technician, Hospital Admin
- **Detailed Descriptions**: Comprehensive feature explanations
- **Registration CTAs**: Direct paths to user onboarding
- **Visual Hierarchy**: Professional card layouts with statistics
- **Interactive Elements**: Hover states and smooth transitions

### 💬 **Social Proof Section**
- **6 Authentic Testimonials**: Real user stories from different roles
- **Star Ratings**: Visual credibility indicators
- **Location Tags**: Geographic diversity showcase
- **Avatar System**: Professional user representations
- **Community Stats**: Impressive user base metrics

### 📱 **Modern Footer**
- **Comprehensive Links**: Organized navigation sections
- **Contact Information**: Multiple contact methods
- **Social Media Integration**: Professional brand presence
- **Security Badges**: Compliance and certification indicators
- **Dark Theme**: Elegant footer design

## Core Features

- **Landing Page**: Exceptional, conversion-optimized landing page with modern design
- **Authentication**: JWT-based authentication with role-based access control
- **Dashboards**: Separate dashboards for Patients, Doctors, Lab Technicians, and Hospital Admins
- **Medical Reports**: View and upload PDF medical reports
- **Smart Health Card**: Download comprehensive health card PDF
- **Responsive Design**: Mobile-first design with healthcare color scheme

## Tech Stack

- **React 19** with Vite
- **React Router DOM** for routing
- **Axios** for API calls
- **JavaScript** (ES6+)
- **CSS** with modern features (gradients, animations, clamp())
- **No external UI libraries** - Pure CSS for maximum performance

## Performance Optimizations

- **Optimized Bundle**: Minimal dependencies for fast loading
- **CSS Animations**: Hardware-accelerated animations
- **Lazy Loading**: Component-based code splitting
- **Responsive Images**: Adaptive loading strategies
- **SEO Friendly**: Semantic HTML and meta optimization

## Project Structure

```
src/
├── api/
│   └── axios.js              # Axios configuration with JWT interceptor
├── auth/
│   ├── ProtectedRoute.jsx    # Route protection component
│   └── roleGuard.js          # Authentication utilities
├── components/
│   ├── Navbar.jsx            # Navigation component
│   ├── Footer.jsx            # Footer component
│   ├── Hero.jsx              # Hero section
│   ├── Features.jsx          # Features section
│   ├── HowItWorks.jsx        # How it works section
│   ├── Testimonials.jsx      # Testimonials section
│   ├── Roles.jsx             # Role selection section
│   └── Loader.jsx            # Loading spinner
├── pages/
│   ├── Landing.jsx           # Landing page
│   ├── patient/
│   │   ├── PatientLogin.jsx      # Patient OTP login
│   │   ├── VerifyOtp.jsx         # OTP verification
│   │   ├── PatientDashboard.jsx  # Patient dashboard
│   │   ├── PatientProfile.jsx    # Patient profile
│   │   ├── PatientReports.jsx    # Medical reports
│   │   └── DownloadHealthCard.jsx # Health card download
│   ├── doctor/
│   │   ├── DoctorLogin.jsx       # Doctor login
│   │   └── DoctorDashboard.jsx   # Doctor dashboard
│   ├── labtech/
│   │   ├── PatientSearch.jsx     # Search patients
│   │   ├── UploadReport.jsx      # Upload reports
│   │   └── LabDashboard.jsx      # Lab dashboard
│   └── admin/
│       ├── AdminLogin.jsx        # Admin login
│       └── AdminDashboard.jsx    # Admin dashboard
├── App.jsx                   # Main app component with routing
├── main.jsx                  # App entry point
├── index.css                 # Global styles
└── App.css                  # App-specific styles
```

## Backend Integration

The frontend integrates with a backend API running on `http://localhost:5133`.

### Authentication Endpoints
- `POST /api/aadhaar/send-otp` - Send OTP for patient login (using Aadhaar number)
- `POST /api/auth/verify-login-otp` - Verify OTP
- `POST /api/auth/lab-tech/login` - Lab technician login
- `POST /api/auth/doctor/login` - Doctor login
- `POST /api/auth/admin/login` - Admin login

### Patient Endpoints
- `GET /api/patients/me` - Get patient profile
- `GET /api/reports` - Get patient reports
- `GET /api/patients/health-card` - Download health card PDF

### Lab Technician Endpoints
- `GET /api/patients/readonly/{patientId}` - Get patient details (read-only)
- `POST /api/reports/upload/{patientId}` - Upload report PDF

### Admin Endpoints
- `GET /api/hospital-admin/pending-doctors` - Get pending doctor verifications
- `GET /api/hospital-admin/verified-doctors` - Get list of verified doctors
- `POST /api/hospital-admin/verify-doctor/{doctorId}` - Verify doctor

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Backend API running on `http://localhost:5133`

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## User Roles

1. **Patient**: OTP-based login via Aadhaar number
   - View profile and medical reports
   - Download health card PDF

2. **Doctor**: Login with email/password
   - Access patient records (if authorized)

3. **Lab Technician**: Login with email/password
   - Search patients (read-only access)
   - Upload medical reports

4. **Hospital Admin**: Login with username/password
   - View all verified doctors
   - Review and verify pending doctor registrations
   - Manage hospital operations

## Security Features

- JWT token stored in localStorage
- Automatic token attachment to API requests
- 401 error handling with automatic logout
- Role-based route protection
- No sensitive data exposure in UI

## Design Guidelines

- Clean, healthcare-themed UI
- Soft blue/green/white color scheme
- Responsive design (mobile-first)
- Minimal animations
- Good spacing and typography

## Security Features

- JWT token stored in localStorage
- Automatic token attachment to all API requests
- No sensitive data exposure in UI (no Aadhaar display)
- Secure logout removes tokens
- **Session Management**: Automatic session monitoring with expiration warnings
- **Session Timeout**: 5-minute warning before session expires
- **Token Validation**: Frontend checks token expiration before API calls

## Contributing

1. Follow the existing code style
2. Ensure all lint checks pass
3. Test API integrations thoroughly
4. Maintain role-based security

## License

This project is part of the AarogyaCard system.
