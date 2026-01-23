using System.ComponentModel.DataAnnotations;

namespace DigitalHealthCard.API.Models
{
    public class Patient:BaseEntity
    {
        [Key]
        public int? Id { get; set; }

        [Required]
        public string? AadhaarNumber { get; set; }

        [Required]
        [MaxLength(100)]
        public string? Name { get; set; }

        public DateTime DateOfBirth { get; set; }

        [MaxLength(10)]
        public string? Gender { get; set; }

        [MaxLength(5)]
        public string? BloodGroup { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Address { get; set; }

        public string? HealthCardNumber { get; set; }

        public DateTime RegistrationDate { get; set; }

        // Navigation
        public ICollection<Nominee> Nominees { get; set; }
        public ICollection<MedicalReport> MedicalReports { get; set; }
    }
}
