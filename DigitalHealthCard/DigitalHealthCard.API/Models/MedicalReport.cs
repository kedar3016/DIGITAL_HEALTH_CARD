using System.ComponentModel.DataAnnotations;

namespace DigitalHealthCard.API.Models
{
    public class MedicalReport:BaseEntity
    {
        [Key]
        public int Id { get; set; }

        public string ReportType { get; set; }

        public DateTime ReportDate { get; set; }

        // Foreign Keys
        public int PatientId { get; set; }
        public Patient Patient { get; set; }

        public int DoctorId { get; set; }
        public Doctor Doctor { get; set; }

        public int LabTechnicianId { get; set; }
        public LabTechnician LabTechnician { get; set; }
    }
}
