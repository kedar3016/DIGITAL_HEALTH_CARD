namespace DigitalHealthCard.API.Models
{
    public class AadhaarRecord
    {
        public long AadhaarNumber { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public long PhoneNumber { get; set; }
    }
}
