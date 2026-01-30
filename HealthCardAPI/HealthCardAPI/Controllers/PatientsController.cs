using HealthCardAPI.Data;
using HealthCardAPI.DTOs;
using HealthCardAPI.Models;
using HealthCardAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace HealthCardAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientsController : ControllerBase
    {
        private readonly IPatientService _service;
        private readonly AppDbContext _context;

        public PatientsController(IPatientService service,AppDbContext context)
        {
            _service = service;
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.GetAllPatients());
        }

        [HttpGet("{aadhaar}")]
        public IActionResult GetByAadhaar(long aadhaar)
        {
            var patient = _service.GetByAadhaar(aadhaar);

            if (patient == null)
                return NotFound("Patient not found");

            return Ok(patient);
        }

        // ✅ REGISTER PATIENT
        [HttpPost("register")]
        public IActionResult Register(RegisterPatientDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var patient = _service.RegisterPatient(dto);

                return Ok(new
                {
                    patient.Id,
                    patient.HealthCardNumber,
                    Message = "Patient registered successfully"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
        [Authorize(Roles = "Patient")]
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var patientId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var patient = await _context.Patients
                .FirstOrDefaultAsync(p => p.Id == patientId);

            if (patient == null)
                return NotFound("Patient not found");

            return Ok(new
            {
                patient.Name,
                patient.Gender,
                patient.BloodGroup,
                patient.PhoneNumber,
                patient.HealthCardNumber,
                patient.DateOfBirth,
                patient.Address
            });
        }

        [Authorize]
        [HttpGet("health-card")]
        public IActionResult DownloadHealthCard()
        {
            var patientId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var patient = _context.Patients
                .FirstOrDefault(p => p.Id == patientId);

            if (patient == null)
                return NotFound("Patient not found");

            Nominee nominee = null;
            if (patient.NomineeId != null)
            {
                nominee = _context.Nominees.FirstOrDefault(n => n.Id == patient.NomineeId);
            }

            var pdfBytes = HealthCardPdfGenerator.Generate(patient, nominee);

            return File(pdfBytes, "application/pdf", "SmartHealthCard.pdf");
        }

        // 🧑‍🔬 LAB TECH & DOCTOR – READ ONLY PATIENT DATA
        [Authorize(Roles = "LabTechnician,Doctor")]
        [HttpGet("readonly/{healthCardId}")]
        public IActionResult GetPatientReadonly(string healthCardId)
        {
            var patient = _context.Patients
                .Where(p => p.HealthCardNumber == healthCardId)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Gender,
                    p.DateOfBirth,
                    p.BloodGroup
                })
                .FirstOrDefault();

            if (patient == null)
                return NotFound("Patient not found");

            return Ok(patient);
        }

        //Update record medical data
        [Authorize(Roles = "LabTechnician")]
        [HttpPut("medical-update/{patientId}")]
        public async Task<IActionResult> UpdateMedicalData(
        int patientId,
        UpdatePatientMedicalDto dto)
        {
            var patient = await _context.Patients.FindAsync(patientId);

            if (patient == null)
                return NotFound("Patient not found");

            patient.BloodGroup = dto.BloodGroup;
            patient.DateOfBirth = dto.DateOfBirth;

            await _context.SaveChangesAsync();

            return Ok("Medical data updated successfully");
        }



    }
}

