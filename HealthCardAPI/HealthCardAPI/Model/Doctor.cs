namespace HealthCardAPI.Models
{
    public class Doctor
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Email { get; set; }
        public long PhoneNumber { get; set; }

        public string Specialization { get; set; }
        public string LicenseNumber { get; set; }

        public int HospitalId { get; set; }

        public bool IsVerified { get; set; } = false;
        public string? Password { get; set; }

        public DateTime RegisteredAt { get; set; } = DateTime.UtcNow;
    }

}
