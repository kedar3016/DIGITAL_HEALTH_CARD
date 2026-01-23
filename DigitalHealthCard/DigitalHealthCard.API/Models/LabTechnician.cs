using System.ComponentModel.DataAnnotations;

namespace DigitalHealthCard.API.Models
{
    public class LabTechnician : BaseEntity
    {
        [Key]
        public int Id { get; set; }

        public string LabName { get; set; }

        public string LabType { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }
    }
}
