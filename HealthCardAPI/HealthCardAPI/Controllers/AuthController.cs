using HealthCardAPI.Data;
using HealthCardAPI.DTOs;
using HealthCardAPI.Model;
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
                .FirstOrDefaultAsync(p => p.PhoneNumber == dto.PhoneNumber);

            if (patient == null)
                return BadRequest("Mobile number not registered");

            var otp = Random.Shared.Next(100000, 999999).ToString();

            _context.OtpVerifications.Add(new OtpVerification
            {
                PhoneNumber = dto.PhoneNumber,
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
                    o.PhoneNumber == dto.PhoneNumber &&
                    o.Otp == dto.Otp &&
                    o.Expiry > DateTime.UtcNow);

            if (record == null)
                return BadRequest("Invalid or expired OTP");

            _context.OtpVerifications.Remove(record);
            await _context.SaveChangesAsync();

            var patient = await _context.Patients
                .FirstOrDefaultAsync(p => p.PhoneNumber == dto.PhoneNumber);

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


    }

}
