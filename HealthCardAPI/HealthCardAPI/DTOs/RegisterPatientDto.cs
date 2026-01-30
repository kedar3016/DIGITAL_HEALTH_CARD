namespace HealthCardAPI.DTOs
{
    public class RegisterPatientDto
    {
        // Aadhaar verified
        public long AadhaarNumber { get; set; }
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }

        // Manual fields
        public string Email { get; set; }
        public string BloodGroup { get; set; }
        public long PhoneNumber { get; set; }

        // Nominee details
        public string NomineeName { get; set; }
        public string NomineeRelation { get; set; }
        public long NomineePhone { get; set; }
    }

}
