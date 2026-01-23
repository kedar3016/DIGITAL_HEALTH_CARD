using System.ComponentModel.DataAnnotations;

namespace DigitalHealthCard.API.DTO
{
    public class PatientRegisterRequestDto
    {
        [Required]
        public string AadhaarNumber { get; set; }

        [Required]
        public string PhoneNumber { get; set; }
    }
}
