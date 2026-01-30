using System.ComponentModel.DataAnnotations;

namespace HealthCardAPI.DTOs
{
    public class CreatePatientDto
    {
        [Required]
        public long AadhaarNumber { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string Gender { get; set; }

        public string BloodGroup { get; set; }

        [Required]
        public long PhoneNumber { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        public string Address { get; set; }

        [Required]
        public string HealthCardNumber { get; set; }

        public DateTime RegistrationDate { get; set; }

        [Required]
        public int NomineeId { get; set; }
    }
}
