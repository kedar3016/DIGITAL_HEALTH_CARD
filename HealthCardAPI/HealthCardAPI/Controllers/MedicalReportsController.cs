using HealthCardAPI.Data;
using HealthCardAPI.DTOs;
using HealthCardAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

[ApiController]
[Route("api/reports")]
public class MedicalReportsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _env;

    public MedicalReportsController(AppDbContext context, IWebHostEnvironment env)
    {
        _context = context;
        _env = env;
    }

    // ✅ UPLOAD PDF (Patient & Doctor & LabTechnician)
    [Authorize]
    [Authorize(Roles = "Patient,Doctor,LabTechnician")]
    [HttpPost("upload/{healthCardId?}")]
    public async Task<IActionResult> Upload(IFormFile file, string? healthCardId = null)
    {
        if (file == null || !file.FileName.EndsWith(".pdf"))
            return BadRequest("Only PDF files allowed");

        var role = User.FindFirst(ClaimTypes.Role)?.Value;
        var uploaderId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

        int? patientId = null;
        string? targetHealthCardId = null;

        if (role == "Patient")
        {
             // Patient uploads for themselves
             patientId = uploaderId;
             var p = await _context.Patients.FirstOrDefaultAsync(x => x.Id == patientId);
             if (p == null) return Unauthorized("Patient not found");
             targetHealthCardId = p.HealthCardNumber;
        }
        else if (role == "Doctor" || role == "LabTechnician")
        {
             // Doctor or Lab Tech uploads for a patient using HealthCardId
             if (string.IsNullOrEmpty(healthCardId))
                 return BadRequest($"{role} must provide a Health Card ID.");

            var p = await _context.Patients.FirstOrDefaultAsync(x => x.HealthCardNumber == healthCardId);
            if (p == null) return NotFound("Patient with this Health Card ID not found.");
            
            patientId = p.Id;
            targetHealthCardId = p.HealthCardNumber;
        }
        else
        {
            return Forbid();
        }

        var folderPath = Path.Combine(_env.WebRootPath, "reports");
        Directory.CreateDirectory(folderPath);

        var fileName = $"{Guid.NewGuid()}.pdf";
        var filePath = Path.Combine(folderPath, fileName);

        using var stream = new FileStream(filePath, FileMode.Create);
        await file.CopyToAsync(stream);

        var report = new MedicalReport
        {
            PatientId = patientId.Value,
            HealthCardId = targetHealthCardId,
            ReportName = file.FileName,
            FilePath = $"/reports/{fileName}",
            UploadedAt = DateTime.UtcNow,
            UploadedByRole = role,
            UploadedById = uploaderId
        };

        _context.MedicalReports.Add(report);
        await _context.SaveChangesAsync();

        return Ok("Report uploaded successfully");
    }

    // ✅ VIEW REPORTS (Shared: Patient sees own, Doctor sees by HealthCardId)
    [Authorize(Roles = "Patient,Doctor")]
    [HttpGet]
    public async Task<IActionResult> GetReports([FromQuery] string? healthCardId)
    {
        var role = User.FindFirst(ClaimTypes.Role)?.Value;

        if (role == "Doctor")
        {
            if (string.IsNullOrEmpty(healthCardId))
                return BadRequest("Health Card ID is required for doctors.");

            var reports = await _context.MedicalReports
                .Where(r => r.HealthCardId == healthCardId)
                .OrderByDescending(r => r.UploadedAt)
                .Select(r => new
                {
                    r.Id,
                    r.ReportName,
                    r.FilePath,
                    r.UploadedAt,
                    UploadedBy = r.UploadedByRole,
                    UploadedById = r.UploadedById
                })
                .ToListAsync();

            if (!reports.Any())
                return Ok(new List<object>()); // Return empty list to avoid frontend errors

            return Ok(reports);
        }
        else // Patient
        {
            var patientIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (patientIdClaim == null) return Unauthorized();

            var patientId = int.Parse(patientIdClaim.Value);
            var patient = await _context.Patients.FirstOrDefaultAsync(p => p.Id == patientId);
            
            if (patient == null) return BadRequest("Patient details not found");

            // ✅ Access by HealthCardId (User Request) OR PatientId (Backwards Comp)
            var reports = await _context.MedicalReports
                .Where(r => r.HealthCardId == patient.HealthCardNumber || r.PatientId == patientId)
                .OrderByDescending(r => r.UploadedAt)
                .Select(r => new
                {
                    r.Id,
                    r.ReportName,
                    r.FilePath,
                    r.UploadedAt,
                    UploadedBy = r.UploadedByRole,
                    UploadedById = r.UploadedById
                })
                .ToListAsync();

            return Ok(reports);
        }
    }

}
