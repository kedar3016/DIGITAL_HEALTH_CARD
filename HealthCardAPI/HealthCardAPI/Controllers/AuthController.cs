using HealthCardAPI.Data;
using HealthCardAPI.DTOs;
using HealthCardAPI.Model;
using HealthCardAPI.Models;
using HealthCardAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HealthCardAPI.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ISmsService _smsService;
        private readonly IJwtService _jwtService;

        public AuthController(AppDbContext context, ISmsService smsService, IJwtService jwtService)
        {
            _context = context;
            _smsService = smsService;
            _jwtService = jwtService;
        }

        [HttpPost("send-login-otp")]
        public async Task<IActionResult> SendLoginOtp(SendLoginOtpDto dto)
        {
            var patient = await _context.Patients
                .FirstOrDefaultAsync(p => p.AadhaarNumber == dto.AadhaarNumber);

            if (patient == null)
                return BadRequest("Aadhaar Number not registered");

            var otp = Random.Shared.Next(100000, 999999).ToString();

            _context.OtpVerifications.Add(new OtpVerification
            {
                PhoneNumber = patient.PhoneNumber, // Use registered phone number
                Otp = otp,
                Expiry = DateTime.UtcNow.AddMinutes(5)
            });

            await _context.SaveChangesAsync();

            await _smsService.SendOtpAsync(patient.PhoneNumber, otp);

            return Ok("OTP sent to registered mobile number linked to Aadhaar");
        }
        [HttpPost("verify-login-otp")]
        public async Task<IActionResult> VerifyLoginOtp(VerifyLoginOtpDto dto)
        {
            var patient = await _context.Patients
                .FirstOrDefaultAsync(p => p.AadhaarNumber == dto.AadhaarNumber);

            if (patient == null)
                return BadRequest("Patient not found");

            var record = await _context.OtpVerifications
                .FirstOrDefaultAsync(o =>
                    o.PhoneNumber == patient.PhoneNumber &&
                    o.Otp == dto.Otp &&
                    o.Expiry > DateTime.UtcNow);

            if (record == null)
                return BadRequest("Invalid or expired OTP");

            _context.OtpVerifications.Remove(record);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                token = _jwtService.GenerateToken(
                patient.Id.ToString(),
                patient.Name,
                "Patient"
                ),
                patient.Name,
                patient.HealthCardNumber
            });
        }

        
        [HttpPost("doctor/login")]
public async Task<IActionResult> DoctorLogin(DoctorLoginDto dto)
{
    var doctor = await _context.Doctors
        .FirstOrDefaultAsync(d =>
            d.Email == dto.Email &&
            d.Password == dto.Password);

    if (doctor == null)
        return Unauthorized("Invalid credentials");

    if (!doctor.IsVerified)
        return Unauthorized("Doctor not verified by hospital admin");

    return Ok(new
    {
        token = _jwtService.GenerateToken(
            doctor.Id.ToString(),
            doctor.Name,
            "Doctor"
        ),
        doctor.Name
    });
}
        //ADMIN LOGIN
        [HttpPost("admin/login")]
        public IActionResult AdminLogin(AdminLoginDto dto)
        {
            var admin = _context.HospitalAdmins
                .FirstOrDefault(a =>
                    a.Username == dto.Username &&
                    a.Password == dto.Password);

            if (admin == null)
                return Unauthorized("Invalid admin credentials");

            return Ok(new
            {
                token = _jwtService.GenerateToken(
                    admin.Id.ToString(),
                    admin.Username,
                    "HospitalAdmin"
                ),
                admin.Username
            });
        }


        [HttpPost("lab-tech/login")]
        public IActionResult LabTechLogin(LabTechLoginDto dto)
        {
            var tech = _context.LabTechnicians.FirstOrDefault(t =>
                t.Email == dto.Email &&
                t.Password == dto.Password &&
                t.IsActive);

            if (tech == null)
                return Unauthorized("Invalid lab technician credentials");

            return Ok(new
            {
                token = _jwtService.GenerateToken(
                    tech.Id.ToString(),
                    tech.TechnicianName,
                    "LabTechnician"
                ),
                tech.TechnicianName,
                tech.LabName
            });
        }

        // 🟢 LAB TECHNICIAN REGISTRATION
        [HttpPost("lab-tech/register")]
        public async Task<IActionResult> RegisterLabTech(RegisterLabTechnicianDto dto)
        {
            // Check if email already exists
            if (await _context.LabTechnicians.AnyAsync(l => l.Email == dto.Email))
                return BadRequest("Email already registered");

            var lab = new LabTechnician
            {
                LabName = dto.LabName,
                LabAddress = dto.LabAddress ?? "Not Provided", // Handle potential nulls
                TechnicianName = dto.TechnicianName, // DTO calls it Name or TechnicianName? Checking DTO... UI sends "name", DTO "TechnicianName"
                PhoneNumber = dto.PhoneNumber,
                Email = dto.Email,
                Password = dto.Password,
                IsActive = false // 🔒 Pending Admin Approval
            };

            _context.LabTechnicians.Add(lab);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Registration successful! Awaiting Hospital Admin approval." });
        }


        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDto dto)
        {
            string email = dto.Email;
            long phoneNumber = 0;

            if (dto.Role == "Doctor")
            {
                var doc = await _context.Doctors.FirstOrDefaultAsync(d => d.Email == email);
                if (doc == null) return NotFound("Doctor not found");
                phoneNumber = doc.PhoneNumber; // Assuming Doctor has Phone property
            }
            else if (dto.Role == "LabTechnician")
            {
                var lab = await _context.LabTechnicians.FirstOrDefaultAsync(l => l.Email == email);
                if (lab == null) return NotFound("Lab Technician not found");
                phoneNumber = lab.PhoneNumber;
            }
            // Add Admin handling if Admin has phone/email
             else if (dto.Role == "HospitalAdmin")
            {
                 // Admin usually has username, assuming email usage here or username lookup
                 // For now, returning specific message as Admin might not have same flow
                 return BadRequest("Contact System Administrator to reset Admin password.");
            }

            if (phoneNumber == 0) return BadRequest("No phone number found for this account.");

             var otp = Random.Shared.Next(100000, 999999).ToString();
             // Store OTP in OtpVerifications (reusing table, using Phone as key)
             _context.OtpVerifications.Add(new OtpVerification
            {
                PhoneNumber = phoneNumber,
                Otp = otp,
                Expiry = DateTime.UtcNow.AddMinutes(5)
            });
            await _context.SaveChangesAsync();
            
            // Send OTP via SMS (or Email if service available, using SMS for now as per stack)
            await _smsService.SendOtpAsync(phoneNumber, otp);

            return Ok(new { Message = "OTP sent to your registered number.", Otp = otp });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto dto)
        {
             string email = dto.Email;
             long phoneNumber = 0;

             // Resolve Phone to verify OTP
             if (dto.Role == "Doctor")
            {
                var doc = await _context.Doctors.FirstOrDefaultAsync(d => d.Email == email);
                if (doc == null) return NotFound("Doctor not found");
                phoneNumber = doc.PhoneNumber;
            }
            else if (dto.Role == "LabTechnician")
            {
                var lab = await _context.LabTechnicians.FirstOrDefaultAsync(l => l.Email == email);
                if (lab == null) return NotFound("Lab Technician not found");
                phoneNumber = lab.PhoneNumber;
            }

             var record = await _context.OtpVerifications
                .FirstOrDefaultAsync(o =>
                    o.PhoneNumber == phoneNumber &&
                    o.Otp == dto.Otp &&
                    o.Expiry > DateTime.UtcNow);

            if (record == null) return BadRequest("Invalid or expired OTP");

            // Update Password
             if (dto.Role == "Doctor")
            {
                var doc = await _context.Doctors.FirstOrDefaultAsync(d => d.Email == email);
                doc.Password = dto.NewPassword; 
            }
             else if (dto.Role == "LabTechnician")
            {
                var lab = await _context.LabTechnicians.FirstOrDefaultAsync(l => l.Email == email);
                lab.Password = dto.NewPassword;
            }

            _context.OtpVerifications.Remove(record);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Password reset successful. Please login." });
        }

    }

}
