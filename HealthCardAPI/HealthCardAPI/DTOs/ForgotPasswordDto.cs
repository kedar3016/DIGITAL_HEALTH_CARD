namespace HealthCardAPI.DTOs
{
    public class ForgotPasswordDto
    {
        public string Email { get; set; }
        public string Role { get; set; } // Doctor, LabTechnician, HospitalAdmin
    }
}
