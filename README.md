# HealthCardAPI (AarogyaCard Backend)

A robust, secure, and scalable RESTful API built with **.NET 8** for the AarogyaCard Digital Health Card system. This backend manages authentication, patient records, health card generation, and interactions between Patients, Doctors, Lab Technicians, and Hospital Admins.

## 🚀 Tech Stack

- **Framework**: ASP.NET Core 8.0 Web API
- **Language**: C#
- **Database**: MySQL (via AWS RDS or Local)
- **ORM**: Entity Framework Core 8.0 (Pomelo.EntityFrameworkCore.MySql)
- **Authentication**: JWT (JSON Web Tokens) with Role-Based Access Control (RBAC)
- **Documentation**: Swagger / OpenAPI
- **PDF Generation**: QuestPDF (Community License) - Used for Health Cards & Reports
- **SMS / OTP**: Twilio
- **Email**: SMTP / EmailService

## ✨ Key Features

### 🔐 Authentication & Security
- **JWT Authentication**: Secure stateless authentication for all roles.
- **Role-Based Authorization**:
  - `Patient`: Login via Aadhaar & OTP.
  - `Doctor`: Email/Password login.
  - `LabTechnician`: Email/Password login.
  - `Admin`: Secure administrative access.
- **CORS Policies**: Configured to allow secure access from the frontend (`http://localhost:5173`).

### 🏥 Core Functionality
- **Digital Health Card**: Auto-generates downloadable PDF health cards for patients.
- **Medical Reports**:
  - Lab Technicians can upload PDF reports.
  - Patients & Doctors can view/download reports.
- **Doctor Verification**: Admin workflow to verify and approve doctor registrations.
- **Patient Search**: Authorized lookup enabling doctors/labs to find patients by Aadhaar/ID.

## 🛠️ Project Structure

```
HealthCardAPI/
├── Controllers/       # API Endpoints (AuthController, PatientController, etc.)
├── Services/          # Business Logic (PatientService, OtpService, etc.)
├── Repositories/      # Data Access Layer (EF Core implementations)
├── Models/            # Database Entities
├── DTOs/              # Data Transfer Objects (Requests/Responses)
├── Data/              # DbContext & Database Configuration
├── Migrations/        # EF Core Database Migrations
└── Program.cs         # App Entry Point & DI Configuration
```

## ⚙️ Setup & Installation

### Prerequisites
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- MySQL Server (Local or Cloud)

### Configuration
Update `appsettings.json` with your credentials:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=your-server;Database=healthcard_db;User=root;Password=your_password;"
  },
  "Jwt": {
    "Key": "your_super_secret_key_needs_to_be_long_enough",
    "Issuer": "HealthCardAPI",
    "Audience": "HealthCardUser"
  },
  "Twilio": {
    "AccountSid": "...",
    "AuthToken": "...",
    "FromPhoneNumber": "..."
  }
}
```

### Running the Application

1. **Restore Dependencies**:
   ```bash
   dotnet restore
   ```

2. **Apply Database Migrations**:
   ```bash
   dotnet ef database update
   ```
   *(Ensure you are in the project folder where `.csproj` exists)*

3. **Run the API**:
   ```bash
   dotnet run
   ```

4. **Access Swagger Documentation**:
   The API provides an interactive UI for testing endpoints:
   - URL: `http://localhost:5133/swagger`

## 📡 API Endpoints Overview

| Module | Method | Endpoint | Description |
|--------|--------|----------|-------------|
| **Auth** | POST | `/api/aadhaar/send-otp` | Send OTP for Patient Login |
| **Auth** | POST | `/api/auth/verify-login-otp` | Verify Patient OTP & Get Token |
| **Patient** | GET | `/api/patients/me` | Get Current Patient Profile |
| **Patient** | GET | `/api/patients/health-card` | Download PDF Health Card |
| **Doctor** | GET | `/api/doctors/patients/{id}` | Access Patient Metadata |
| **Reports** | POST | `/api/reports/upload` | Upload Medical Report (Lab Tech) |
| **Reports** | GET | `/api/reports/patient/{id}` | Get Reports for a Patient |

## 🤝 Contributing

1. Fork the branch.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

