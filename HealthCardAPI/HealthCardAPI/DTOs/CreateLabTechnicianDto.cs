using System.ComponentModel.DataAnnotations;

namespace HealthCardAPI.DTOs
{
    public class CreateLabTechnicianDto
    {
        [Required]
        public string LabName { get; set; }

        [Required]
        public string LabType { get; set; }

        [Required]
        public long PhoneNumber { get; set; }

        [EmailAddress]
        public string Email { get; set; }
    }
}
