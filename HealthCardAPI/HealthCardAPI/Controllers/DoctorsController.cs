using HealthCardAPI.Data;
using HealthCardAPI.DTOs;
using HealthCardAPI.Models;
using HealthCardAPI.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthCardAPI.Controllers
{
    [ApiController]
    [Route("api/doctors")]
    public class DoctorsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DoctorsController(AppDbContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "Doctor")]
        [HttpGet("me")]
        public async Task<IActionResult> GetMe()
        {
            var doctorId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier).Value);
            var doctor = await _context.Doctors.FindAsync(doctorId);

            if (doctor == null) return NotFound();

            return Ok(new
            {
                doctor.Name,
                doctor.Email,
                doctor.Specialization,
                doctor.LicenseNumber,
                doctor.HospitalId
            });
        }

        // 🟢 DOCTOR REGISTRATION
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDoctorDto dto)
        {
            var doctor = new Doctor
            {
                Name = dto.Name,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                Specialization = dto.Specialization,
                LicenseNumber = dto.LicenseNumber,
                HospitalId = dto.HospitalId,
                IsVerified = false
            };

            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Doctor registered successfully. Awaiting hospital admin verification."
            });
        }
    }

}
