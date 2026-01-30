using System.ComponentModel.DataAnnotations;

namespace HealthCardAPI.Models
{
    public class ReportAccessLog
    {
        [Key]
        public int Id { get; set; }

        public int PatientId { get; set; } // The patient whose report was viewed
        public string ViewerRole { get; set; } // Doctor, LabTechnician (For now only Doctor views)
        public int ViewerId { get; set; } // DoctorId
        
        public int ReportId { get; set; }
        public DateTime ViewedAt { get; set; } = DateTime.UtcNow;
    }
}
