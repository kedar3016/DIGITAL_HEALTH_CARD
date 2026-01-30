using HealthCardAPI.Data;
using HealthCardAPI.DTOs;
using HealthCardAPI.Models;
using HealthCardAPI.Services;
using Microsoft.AspNetCore.Authorization; // Required for AllowAnonymous
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace HealthCardAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LabTechniciansController : ControllerBase
    {
        private readonly ILabTechnicianService _service;
        private readonly AppDbContext _context;

        public LabTechniciansController(ILabTechnicianService service, AppDbContext context)
        {
            _service = service;
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.GetAllLabTechnicians());
        }

        [HttpPost]
        public IActionResult Create(CreateLabTechnicianDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var lab = new LabTechnician
            {
                LabName = dto.LabName,
                PhoneNumber = dto.PhoneNumber,
                Email = dto.Email
            };

            return Ok(_service.CreateLabTechnician(lab));
        }

        // 🟢 LabTechnician REGISTRATION
        [AllowAnonymous] // 👈 ADD THIS: This fixes the 401 error for registration
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterLabTechnicianDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var labTech = new LabTechnician
            {
                LabName = dto.LabName,
                PhoneNumber = dto.PhoneNumber,
                LabAddress = dto.LabAddress,
                TechnicianName = dto.TechnicianName,
                Email = dto.Email,
                Password = dto.Password,
                IsActive = false
            };

            _context.LabTechnicians.Add(labTech);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Registration successful. Awaiting hospital admin verification."
            });
        }

        // ✅ GET CURRENT LAB TECH PROFILE
        [Authorize(Roles = "LabTechnician")]
        [HttpGet("me")]
        public async Task<IActionResult> GetMe()
        {
            var idClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (idClaim == null) return Unauthorized();

            var id = int.Parse(idClaim.Value);
            var labTech = await _context.LabTechnicians.FindAsync(id);

            if (labTech == null) return NotFound("Lab Technician not found");

            return Ok(new
            {
                labTech.Id,
                labTech.TechnicianName,
                labTech.LabName,
                labTech.Email,
                labTech.PhoneNumber
            });
        }
    }
}