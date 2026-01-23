using System.ComponentModel.DataAnnotations;

namespace DigitalHealthCard.API.Models
{
    public class Nominee : BaseEntity
    {
        [Key]
        public int Id { get; set; }

        public string NomineeName { get; set; }

        public string AadhaarNumber { get; set; }

        public string Gender { get; set; }

        public string BloodRelation { get; set; }

        public string ContactNo { get; set; }

        public string RelationshipWithPatient { get; set; }

        public int EmergencyPIN { get; set; }

        // FK
        public int PatientId { get; set; }
        public Patient Patient { get; set; }
    }
}
