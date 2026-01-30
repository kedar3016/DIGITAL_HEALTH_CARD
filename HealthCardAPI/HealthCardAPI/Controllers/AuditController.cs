using HealthCardAPI.Data;
using HealthCardAPI.Models; // For ReportAccessLog
using HealthCardAPI.Model;   // For Patient, Doctor, etc.
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace HealthCardAPI.Controllers
{
    [ApiController]
    [Route("api/audit")]
    public class AuditController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuditController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/audit/log-view
        // Logs when a doctor/labtech views a report
        [Authorize(Roles = "Doctor,LabTechnician")]
        [HttpPost("log-view")]
        public async Task<IActionResult> LogView([FromBody] ReportViewRequest request)
        {
            var role = User.FindFirst(ClaimTypes.Role)?.Value;
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var log = new ReportAccessLog
            {
                ReportId = request.ReportId,
                PatientId = request.PatientId,
                ViewerId = userId,
                ViewerRole = role,
                ViewedAt = DateTime.UtcNow
            };

            _context.ReportAccessLogs.Add(log);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Logged successfully" });
        }

        // GET: api/audit/patient-notifications/123456789012 (Aadhaar)
        // Returns unified list of Uploads and Views with Real Names
        [Authorize(Roles = "Patient")]
        [HttpGet("patient-notifications/{aadhaar}")]
        public async Task<IActionResult> GetNotifications(long aadhaar)
        {
            // Verify Patient
            var patient = await _context.Patients.FirstOrDefaultAsync(p => p.AadhaarNumber == aadhaar);
            if (patient == null) return NotFound("Patient not found");

            // 1. Get Report Uploads (Filtered by Patient)
            // Use local variable to avoid "cannot be translated" error
            var healthCardNumber = patient.HealthCardNumber;
            var patientId = patient.Id;

            var reports = await _context.MedicalReports
                .Where(r => r.HealthCardId == healthCardNumber || r.PatientId == patientId)
                .OrderByDescending(r => r.UploadedAt)
                .ToListAsync();

            // 2. Get View Logs
            var views = await _context.ReportAccessLogs
                .Where(l => l.PatientId == patientId)
                .OrderByDescending(l => l.ViewedAt)
                .Take(50) // Limit
                .ToListAsync();

            var notifications = new List<NotificationDto>();

            // Process Uploads (Fetch Uploader Names)
            foreach (var r in reports)
            {
                string uploaderName = "Unknown";
                if (r.UploadedByRole == "Doctor")
                {
                    var doc = await _context.Doctors.FindAsync(r.UploadedById);
                    uploaderName = doc != null ? (doc.Name.StartsWith("Dr.") || doc.Name.StartsWith("Dr ") ? doc.Name : $"Dr. {doc.Name}") : "Doctor";

                }
                else if (r.UploadedByRole == "LabTechnician")
                {
                    var lab = await _context.LabTechnicians.FindAsync(r.UploadedById);
                    uploaderName = lab != null ? $"Lab Tech {lab.TechnicianName}" : "Lab Technician";

                }

                if (r.UploadedByRole != "Patient") // Only notify if others uploaded
                {
                    notifications.Add(new NotificationDto
                    {
                        Type = "UPLOAD",
                        Message = $"{uploaderName} uploaded a report: {r.ReportName}",
                        Date = r.UploadedAt,
                        Icon = r.UploadedByRole == "Doctor" ? "👨‍⚕️" : "🧪"
                    });
                }
            }

            // Process Views (Fetch Viewer Names)
            foreach (var v in views)
            {
                string viewerName = "Unknown";
                if (v.ViewerRole == "Doctor")
                {
                    var doc = await _context.Doctors.FindAsync(v.ViewerId);
                    viewerName = doc != null ? (doc.Name.StartsWith("Dr.") || doc.Name.StartsWith("Dr ") ? doc.Name : $"Dr. {doc.Name}") : "Doctor";

                }
                else if (v.ViewerRole == "LabTechnician")
                {
                    var lab = await _context.LabTechnicians.FindAsync(v.ViewerId);
                    viewerName = lab != null ? $"{lab.TechnicianName}" : "Lab Technician";

                }
                
                // Find Report Name
                var report = reports.FirstOrDefault(r => r.Id == v.ReportId);
                var reportName = report != null ? report.ReportName : "a report";

                notifications.Add(new NotificationDto
                {
                    Type = "VIEW",
                    Message = $"{viewerName} viewed your report: {reportName}",
                    Date = v.ViewedAt,
                    Icon = "👁️"
                });
            }

            return Ok(notifications.OrderByDescending(n => n.Date));
        }
    }

    public class ReportViewRequest
    {
        public int ReportId { get; set; }
        public int PatientId { get; set; }
    }

    public class NotificationDto
    {
        public string Type { get; set; } // UPLOAD, VIEW
        public string Message { get; set; }
        public DateTime Date { get; set; }
        public string Icon { get; set; }
    }
}
