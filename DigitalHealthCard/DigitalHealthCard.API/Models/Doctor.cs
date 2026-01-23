using System.ComponentModel.DataAnnotations;

namespace DigitalHealthCard.API.Models
{
    public class Doctor : BaseEntity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string LicenseNumber { get; set; }

        public string Specialization { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public string HospitalName { get; set; }

        public string Country { get; set; }
    }
}
