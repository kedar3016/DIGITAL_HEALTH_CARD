using HealthCardAPI.Data;
using HealthCardAPI.DTOs;
using HealthCardAPI.Model;
using HealthCardAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

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
                return BadRequest("Mobile number not registered");

            var otp = Random.Shared.Next(100000, 999999).ToString();

            _context.OtpVerifications.Add(new OtpVerification
            {
                AadhaarNumber = dto.AadhaarNumber,
                Otp = otp,
                Expiry = DateTime.UtcNow.AddMinutes(5)
            });

            await _context.SaveChangesAsync();

            //await _smsService.SendOtpAsync(dto.PhoneNumber, otp); For Testing Purspose Pause

            return Ok($"OTP sent to registered mobile number Your Otp Is {otp}");
        }
        [HttpPost("verify-login-otp")]
        public async Task<IActionResult> VerifyLoginOtp(VerifyLoginOtpDto dto)
        {
            var record = await _context.OtpVerifications
                .FirstOrDefaultAsync(o =>
                    o.AadhaarNumber == dto.AadhaarNumber &&
                    o.Otp == dto.Otp &&
                    o.Expiry > DateTime.UtcNow);

            if (record == null)
                return BadRequest("Invalid or expired OTP");

            _context.OtpVerifications.Remove(record);
            await _context.SaveChangesAsync();

            var patient = await _context.Patients
                .FirstOrDefaultAsync(p => p.AadhaarNumber == dto.AadhaarNumber);

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

    // Demo: In-memory OTP store to avoid DB schema changes for now
    private static readonly Dictionary<string, string> _doctorOtps = new();

    [HttpPost("doctor/forgot-password")]
    public async Task<IActionResult> DoctorForgotPassword([FromBody] DoctorForgotPasswordDto dto)
    {
        if (string.IsNullOrEmpty(dto.Email))
            return BadRequest("Email is required");

        var doctor = await _context.Doctors.FirstOrDefaultAsync(d => d.Email == dto.Email);
        if (doctor == null)
            return NotFound("Doctor with this email does not exist");

        // Generate OTP
        var otp = Random.Shared.Next(100000, 999999).ToString();
        
        // Store in mock cache
        if (_doctorOtps.ContainsKey(dto.Email))
            _doctorOtps[dto.Email] = otp;
        else
            _doctorOtps.Add(dto.Email, otp);

        // Return OTP in response as requested for demo
        return Ok(new { message = $"OTP sent. For demo purposes: {otp}", otp = otp });
    }

    [HttpPost("doctor/reset-password")]
    public async Task<IActionResult> DoctorResetPassword([FromBody] DoctorResetPasswordDto dto)
    {
        if (!_doctorOtps.ContainsKey(dto.Email) || _doctorOtps[dto.Email] != dto.Otp)
            return BadRequest("Invalid or expired OTP");

        var doctor = await _context.Doctors.FirstOrDefaultAsync(d => d.Email == dto.Email);
        if (doctor == null)
            return NotFound("Doctor not found");

        doctor.Password = dto.NewPassword; 
        // Note: In real app, password should be hashed. keeping as is per existing pattern or instruction "no changing other codes".
        
        await _context.SaveChangesAsync();
        _doctorOtps.Remove(dto.Email);

        return Ok(new { message = "Password reset successfully. You can now login." });
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

        // Lab Tech OTP Cache
        private static readonly Dictionary<string, string> _labTechOtps = new();

        [HttpPost("lab-tech/forgot-password")]
        public async Task<IActionResult> LabTechForgotPassword([FromBody] LabTechForgotPasswordDto dto)
        {
            if (string.IsNullOrEmpty(dto.Email))
                return BadRequest("Email is required");

            var tech = await _context.LabTechnicians.FirstOrDefaultAsync(t => t.Email == dto.Email);
            if (tech == null)
                return NotFound("Lab Technician with this email does not exist");

            // Generate OTP
            var otp = Random.Shared.Next(100000, 999999).ToString();

            // Store in mock cache
            if (_labTechOtps.ContainsKey(dto.Email))
                _labTechOtps[dto.Email] = otp;
            else
                _labTechOtps.Add(dto.Email, otp);

            // Return OTP in response as requested for demo
            return Ok(new { message = $"OTP sent. For demo purposes: {otp}", otp = otp });
        }

        [HttpPost("lab-tech/reset-password")]
        public async Task<IActionResult> LabTechResetPassword([FromBody] LabTechResetPasswordDto dto)
        {
            if (!_labTechOtps.ContainsKey(dto.Email) || _labTechOtps[dto.Email] != dto.Otp)
                return BadRequest("Invalid or expired OTP");

            var tech = await _context.LabTechnicians.FirstOrDefaultAsync(t => t.Email == dto.Email);
            if (tech == null)
                return NotFound("Lab Technician not found");

            tech.Password = dto.NewPassword;
            // Note: In real app, password should be hashed. keeping as is per existing pattern or instruction "no changing other codes".

            await _context.SaveChangesAsync();
            _labTechOtps.Remove(dto.Email);

            return Ok(new { message = "Password reset successfully. You can now login." });
        }

    }

}
