using HealthCardAPI.Data;
using HealthCardAPI.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace HealthCardAPI.Controllers
{
    [ApiController]
    [Route("api/nominee")]
    public class NomineeController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NomineeController(AppDbContext context)
        {
            _context = context;
        }

        // 🚨 EMERGENCY ACCESS (DOCTOR ONLY)
        [Microsoft.AspNetCore.Authorization.Authorize(Roles = "Doctor")]
        [HttpPost("emergency-access")]
        public IActionResult EmergencyAccess([FromBody] EmergencyAccessDto dto)
        {
            // 1️⃣ Find patient by health card
            var patient = _context.Patients
                .FirstOrDefault(p => p.HealthCardNumber == dto.HealthCardNumber);

            if (patient == null)
                return BadRequest("Invalid Health Card Number");

            // 2️⃣ Find Nominee (if any)
            var nominee = patient.NomineeId != null 
                ? _context.Nominees.FirstOrDefault(n => n.Id == patient.NomineeId) 
                : null;

            // 3️⃣ Fetch reports (READ ONLY)
            var reports = _context.MedicalReports
                .Where(r => r.PatientId == patient.Id)
                .Select(r => new
                {
                    r.ReportName,
                    r.FilePath,
                    r.UploadedAt
                })
                .ToList();

            // 4️⃣ Return LIMITED patient data
            return Ok(new
            {
                patient.Name,
                patient.BloodGroup,
                patient.Gender,
                patient.PhoneNumber,
                NomineeName = nominee?.Name ?? "Not Available",
                NomineeRelation = nominee?.Relation ?? "N/A",
                NomineePhone = nominee?.PhoneNumber.ToString() ?? "N/A",
                Reports = reports
            });
        }
    }
}
