namespace HealthCardAPI.DTOs
{
    public class RegisterLabTechnicianDto
    {
        public string LabName { get; set; }
        public string LabAddress { get; set; }
        public string TechnicianName { get; set; }
        public long PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
