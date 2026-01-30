using HealthCardAPI.Data;
using HealthCardAPI.Models;
using HealthCardAPI.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace HealthCardAPI.Controllers
{
    [Route("api/access")]
    [ApiController]
    public class AccessController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AccessController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/access/request
        [Authorize(Roles = "Doctor,LabTechnician")]
        [HttpPost("request")]
        public async Task<IActionResult> RequestAccess([FromBody] AccessRequestDto request)
        {
            var role = User.FindFirst(ClaimTypes.Role)?.Value;
            var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var existing = await _context.AccessRequests
                .FirstOrDefaultAsync(r => r.PatientId == request.PatientId && r.RequesterId == requesterId && r.RequesterRole == role);

            if (existing != null)
            {
                return Ok(new { message = "Request already exists", status = existing.Status });
            }

            var newRequest = new AccessRequest
            {
                PatientId = request.PatientId,
                RequesterId = requesterId,
                RequesterRole = role,
                Status = "PENDING",
                RequestedAt = DateTime.UtcNow
            };

            _context.AccessRequests.Add(newRequest);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Access requested successfully", status = "PENDING" });
        }

        // GET: api/access/status/{patientId}
        [Authorize(Roles = "Doctor,LabTechnician")]
        [HttpGet("status/{patientId}")]
        public async Task<IActionResult> GetStatus(int patientId)
        {
            var role = User.FindFirst(ClaimTypes.Role)?.Value;
            var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var request = await _context.AccessRequests
                .FirstOrDefaultAsync(r => r.PatientId == patientId && r.RequesterId == requesterId && r.RequesterRole == role);

            if (request == null) return Ok(new { status = "NOT_REQUESTED" });

            return Ok(new { status = request.Status });
        }

        // GET: api/access/pending
        [Authorize(Roles = "Patient")]
        [HttpGet("pending")]
        public async Task<IActionResult> GetPendingRequests()
        {
            var patientId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            
            var requests = await _context.AccessRequests
                .Where(r => r.PatientId == patientId && r.Status == "PENDING")
                .OrderByDescending(r => r.RequestedAt)
                .ToListAsync();

            var result = new List<object>();

            foreach (var r in requests)
            {
                string requesterName = "Unknown";
                if (r.RequesterRole == "Doctor")
                {
                    var doc = await _context.Doctors.FindAsync(r.RequesterId);
                    // Handle Dr. name formatting
                     requesterName = doc != null ? (doc.Name.StartsWith("Dr.") || doc.Name.StartsWith("Dr ") ? doc.Name : $"Dr. {doc.Name}") : "Doctor";
                }
                else if (r.RequesterRole == "LabTechnician")
                {
                    var lab = await _context.LabTechnicians.FindAsync(r.RequesterId);
                    requesterName = lab != null ? $"Lab Tech {lab.TechnicianName}" : "Lab Technician";
                }

                result.Add(new
                {
                    r.Id,
                    r.RequesterRole,
                    RequesterName = requesterName,
                    r.RequestedAt
                });
            }

            return Ok(result);
        }

        // POST: api/access/respond
        [Authorize(Roles = "Patient")]
        [HttpPost("respond")]
        public async Task<IActionResult> RespondToRequest([FromBody] RespondRequestDto response)
        {
            var patientId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var request = await _context.AccessRequests.FindAsync(response.RequestId);
            if (request == null) return NotFound("Request not found");

            if (request.PatientId != patientId) return Forbid();

            request.Status = response.Action; // APPROVED or DENIED
            request.RespondedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new { message = $"Request {response.Action.ToLower()} successfully" });
        }
    }

    public class AccessRequestDto
    {
        public int PatientId { get; set; }
    }

    public class RespondRequestDto
    {
        public int RequestId { get; set; }
        public string Action { get; set; } // APPROVED, DENIED
    }
}
