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

    // ✅ UPLOAD PDF
    [Authorize]
    [Authorize]
    [Authorize(Roles = "Patient,Doctor")]
    [HttpPost("upload")]
    public async Task<IActionResult> Upload(IFormFile file)
    {
        if (file == null || !file.FileName.EndsWith(".pdf"))
            return BadRequest("Only PDF files allowed");

        var role = User.FindFirst(ClaimTypes.Role)?.Value;
        var uploaderId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

        int patientId = uploaderId; // Patient uploads own report

        var folderPath = Path.Combine(_env.WebRootPath, "reports");
        Directory.CreateDirectory(folderPath);

        var fileName = $"{Guid.NewGuid()}.pdf";
        var filePath = Path.Combine(folderPath, fileName);

        using var stream = new FileStream(filePath, FileMode.Create);
        await file.CopyToAsync(stream);

        var report = new MedicalReport
        {
            PatientId = patientId,
            ReportName = file.FileName,
            FilePath = $"/reports/{fileName}",
            UploadedAt = DateTime.UtcNow,
            UploadedByRole = role,
            UploadedById = role == "Patient" ? null : uploaderId
        };

        _context.MedicalReports.Add(report);
        await _context.SaveChangesAsync();

        return Ok("Report uploaded successfully");
    }

    // ✅ VIEW REPORTS
    [Authorize]
    [Authorize(Roles = "Patient")]
    [HttpGet]
    public IActionResult GetReports()
    {
        var patientId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

        var reports = _context.MedicalReports
            .Where(r => r.PatientId == patientId)
            .Select(r => new
            {
                r.Id,
                r.ReportName,
                r.FilePath,
                r.UploadedAt,
                UploadedBy = r.UploadedByRole,
                UploadedById = r.UploadedById
            });

        return Ok(reports);
    }

    //Upload by Lab Technician
    [Authorize(Roles = "LabTechnician")]
    [HttpPost("upload/{patientId}")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UploadReport(
    int patientId,
    [FromForm] UploadReportDto dto)
    {
        if (dto.File == null || !dto.File.FileName.EndsWith(".pdf"))
            return BadRequest("Only PDF files allowed");

        var patientExists = await _context.Patients.AnyAsync(p => p.Id == patientId);
        if (!patientExists)
            return BadRequest("Invalid patient");

        var labTechId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var rootPath = _env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
        var folderPath = Path.Combine(rootPath, "reports");
        Directory.CreateDirectory(folderPath);

        var fileName = $"{Guid.NewGuid()}.pdf";
        var filePath = Path.Combine(folderPath, fileName);

        using var stream = new FileStream(filePath, FileMode.Create);
        await dto.File.CopyToAsync(stream);

        var report = new MedicalReport
        {
            PatientId = patientId,
            ReportName = dto.File.FileName,
            FilePath = $"/reports/{fileName}",
            UploadedAt = DateTime.UtcNow,
            UploadedByRole = "LabTechnician",
            UploadedById = labTechId
        };

        _context.MedicalReports.Add(report);
        await _context.SaveChangesAsync();

        return Ok("Report uploaded successfully");
    }



    //[Authorize]
    //[HttpGet]
    //public IActionResult GetAllReports()
    //{
    //    var patientIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

    //    if (patientIdClaim == null)
    //        return Unauthorized("Invalid token");

    //    int patientId = int.Parse(patientIdClaim.Value);

    //    var reports = _context.MedicalReports
    //        .Where(r => r.PatientId == patientId)
    //        .OrderByDescending(r => r.UploadedAt)
    //        .Select(r => new
    //        {
    //            r.Id,
    //            r.ReportName,
    //            r.FilePath,
    //            r.UploadedAt,
    //            UploadedBy = r.UploadedByRole
    //        })
    //        .ToList();

    //    return Ok(reports);
    //}

}
