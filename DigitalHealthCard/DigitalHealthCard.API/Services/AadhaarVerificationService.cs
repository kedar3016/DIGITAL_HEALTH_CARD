using DigitalHealthCard.API.Models;

namespace DigitalHealthCard.API.Services
{
    public class AadhaarVerificationService
    {
        private static readonly List<AadhaarRecord> AadhaarDataset = new()
        {
            new AadhaarRecord
            {
                AadhaarNumber = "123456789012",
                Name = "Rahul Sharma",
                Gender = "Male",
                DateOfBirth = new DateTime(1998, 5, 21),
                Address = "Pune, Maharashtra",
                PhoneNumber = "9876543210"
            }
        };

        public AadhaarRecord Verify(string aadhaarNumber)
        {
            return AadhaarDataset
                .FirstOrDefault(a => a.AadhaarNumber == aadhaarNumber);
        }
    }
}
