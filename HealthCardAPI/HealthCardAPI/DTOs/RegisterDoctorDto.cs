namespace HealthCardAPI.DTOs
{
    public class RegisterDoctorDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public long PhoneNumber { get; set; }
        public string Specialization { get; set; }
        public string LicenseNumber { get; set; }
        public string Password { get; set; }
        public int HospitalId { get; set; }
    }
}
