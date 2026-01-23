using System.ComponentModel.DataAnnotations;

namespace DigitalHealthCard.API.Models
{
    public class Admin : BaseEntity
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Role { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }
    }
}
