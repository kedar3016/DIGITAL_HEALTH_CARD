using HealthCardAPI.Data;
using HealthCardAPI.DTOs;
using HealthCardAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HealthCardAPI.Controllers
{
    [ApiController]
    [Route("api/hospital-admin")]
    [Authorize(Roles = "HospitalAdmin")]
    public class HospitalAdminController : ControllerBase
    {
        private readonly AppDbContext _context;

        public HospitalAdminController(AppDbContext context)
        {
            _context = context;
        }

        // 🔍 VIEW PENDING DOCTORS
        [HttpGet("pending-doctors")]
        public IActionResult GetPendingDoctors()
        {
            var doctors = _context.Doctors
                .Where(d => !d.IsVerified)
                .Select(d => new
                {
                    d.Id,
                    d.Name,
                    d.Specialization,
                    d.LicenseNumber,
                    d.HospitalId
                })
                .ToList();

            return Ok(doctors);
        }

        [HttpPost("verify-doctor/{doctorId}")]
        public async Task<IActionResult> VerifyDoctor(int doctorId)
        {
            var doctor = await _context.Doctors.FindAsync(doctorId);

            if (doctor == null)
                return NotFound("Doctor not found");

            doctor.IsVerified = true;
            doctor.Password = "doctor@123"; // default password

            await _context.SaveChangesAsync();

            return Ok("Doctor verified. Login credentials activated.");
        }

        // 🔍 VIEW PENDING LAB TECHNICIANS
        [HttpGet("pending-lab-technicians")]
        public IActionResult GetPendingLabTechnicians()
        {
            var technicians = _context.LabTechnicians
                .Where(lt => !lt.IsActive) // Fetching technicians where IsActive is false
                .Select(lt => new
                {
                    lt.Id,
                    lt.TechnicianName,
                    lt.LabName,
                    lt.LabAddress,
                    lt.PhoneNumber,
                    lt.Email
                })
                .ToList();

            return Ok(technicians);
        }

        // ✅ VERIFY LAB TECHNICIAN
        [HttpPost("verify-lab-technician/{techId}")]
        public async Task<IActionResult> VerifyLabTechnician(int techId)
        {
            var tech = await _context.LabTechnicians.FindAsync(techId);

            if (tech == null)
                return NotFound("Lab Technician not found");

            tech.IsActive = true;
            // Optional: Set a default password if they didn't set one during registration
            if (string.IsNullOrEmpty(tech.Password))
            {
                tech.Password = "labtech@123";
            }

            await _context.SaveChangesAsync();

            return Ok("Lab technician verified. Account activated.");
        }

        [HttpPost("register-lab-technician")]
        public async Task<IActionResult> RegisterLabTechnician(RegisterLabTechnicianDto dto)
        {
            var tech = new LabTechnician
            {
                LabName = dto.LabName,
                LabAddress = dto.LabAddress,
                TechnicianName = dto.TechnicianName,
                PhoneNumber = dto.PhoneNumber,
                Email = dto.Email,
                Password = dto.Password,
                IsActive = true
            };

            _context.LabTechnicians.Add(tech);
            await _context.SaveChangesAsync();

            return Ok("Lab technician registered successfully");
        }
    }
}