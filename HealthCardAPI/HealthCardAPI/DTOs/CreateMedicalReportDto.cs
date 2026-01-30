using System.ComponentModel.DataAnnotations;

namespace HealthCardAPI.DTOs
{
    public class CreateMedicalReportDto
    {
        [Required]
        public string ReportType { get; set; }

        [Required]
        public DateTime ReportDate { get; set; }

        [Required]
        public int PatientId { get; set; }

        [Required]
        public int DoctorId { get; set; }

        [Required]
        public int LabTechId { get; set; }
    }
}
