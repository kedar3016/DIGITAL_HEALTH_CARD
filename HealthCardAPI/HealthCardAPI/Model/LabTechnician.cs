namespace HealthCardAPI.Models
{
    public class LabTechnician
    {
        public int Id { get; set; }

        // 🏥 Lab details
        public string LabName { get; set; }
        public string LabAddress { get; set; }

        // 👤 Technician details
        public string TechnicianName { get; set; }

        // 🔐 Login details
        public long PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        // 🔒 Control
        public bool IsActive { get; set; } = true;
    }
}
