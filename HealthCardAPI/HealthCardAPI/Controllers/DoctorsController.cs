using HealthCardAPI.Data;
using HealthCardAPI.DTOs;
using HealthCardAPI.Models;
using HealthCardAPI.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        // 👤 GET LOGGED-IN DOCTOR PROFILE
        [Authorize(Roles = "Doctor")]
        [HttpGet("me")]
        public async Task<IActionResult> GetProfile()
        {
            var doctorIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
            
            if (doctorIdClaim == null) return Unauthorized("Invalid token");

            int doctorId = int.Parse(doctorIdClaim.Value);
            var doctor = await _context.Doctors.FindAsync(doctorId);

            if (doctor == null) return NotFound("Doctor not found");

            return Ok(new
            {
                doctor.Id,
                doctor.Name,
                doctor.Email,
                doctor.Specialization,
                doctor.LicenseNumber,
                doctor.PhoneNumber,
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
                HospitalId = dto.HospitalId == 0 ? 1 : dto.HospitalId, // Default to 1 if 0
                IsVerified = false,
                Password = dto.Password // Save the password!
            };

            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Doctor registered successfully. Awaiting hospital admin verification."
            });
        }

        // 🔍 GET ALL VERIFIED DOCTORS
        [HttpGet]
        public async Task<IActionResult> GetVerifiedDoctors()
        {
            var doctors = await _context.Doctors
                .Where(d => d.IsVerified)
                .Select(d => new
                {
                    d.Id,
                    d.Name,
                    d.Specialization,
                    d.LicenseNumber,
                    d.HospitalId,
                    d.PhoneNumber,
                    d.Email
                })
                .ToListAsync();

            return Ok(doctors);
        }



        // 📋 GET MY PATIENTS (For now, returns all patients as demo)
        [Authorize(Roles = "Doctor")]
        [HttpGet("patients")]
        public async Task<IActionResult> GetDoctorPatients()
        {
            // In a real app, verify relationship via Appointments table.
            // For this demo, return recent patients.
            var patients = await _context.Patients
                .OrderByDescending(p => p.RegistrationDate)
                .Take(10)
                .ToListAsync();

            return Ok(patients);
        }
    }

}
