using System.ComponentModel.DataAnnotations;

namespace HealthCardAPI.Models
{
    public class AccessRequest
    {
        [Key]
        public int Id { get; set; }

        public int PatientId { get; set; }
        public int RequesterId { get; set; } // DoctorId or LabTechnicianId
        public string RequesterRole { get; set; } // "Doctor" or "LabTechnician"
        
        public string Status { get; set; } = "PENDING"; // PENDING, APPROVED, DENIED
        
        public DateTime RequestedAt { get; set; } = DateTime.UtcNow;
        public DateTime? RespondedAt { get; set; }
    }
}
