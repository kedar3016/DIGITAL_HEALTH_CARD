namespace HealthCardAPI.Models
{
    public class Patient
    {
        public int Id { get; set; }
        public long AadhaarNumber { get; set; }
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string BloodGroup { get; set; }
        public long PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string HealthCardNumber { get; set; }
        public DateTime RegistrationDate { get; set; }
        public int? NomineeId { get; set; }
    }
}
