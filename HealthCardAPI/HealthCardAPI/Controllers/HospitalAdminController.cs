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
            doctor.Password = "doctor@123"; // default password (tell doctor to change later)

            await _context.SaveChangesAsync();

            return Ok("Doctor verified. Login credentials activated.");
        }

        // 🔍 VIEW PENDING LABS
        [HttpGet("pending-labs")]
        public async Task<IActionResult> GetPendingLabs()
        {
            var labs = await _context.LabTechnicians
                .Where(l => !l.IsActive)
                .ToListAsync();

            return Ok(labs);
        }

        // ✅ VERIFY LAB
        [HttpPost("verify-lab/{labId}")]
        public async Task<IActionResult> VerifyLab(int labId)
        {
            var lab = await _context.LabTechnicians.FindAsync(labId);

            if (lab == null)
                return NotFound("Lab Technician not found");

            lab.IsActive = true;
            await _context.SaveChangesAsync();

            return Ok("Lab Technician verified and activated.");
        }


        [Authorize(Roles = "HospitalAdmin")]
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
