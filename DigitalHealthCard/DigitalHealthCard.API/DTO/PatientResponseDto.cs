namespace DigitalHealthCard.API.DTO
{
    public class PatientResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }
        public string BloodGroup { get; set; }
        public string HealthCardNumber { get; set; }
    }
}
