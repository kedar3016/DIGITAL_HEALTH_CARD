using DigitalHealthCard.API.Data;
using DigitalHealthCard.API.DTO;
using DigitalHealthCard.API.Models;

namespace DigitalHealthCard.API.Services
{
    public class PatientService
    {
        private readonly AppDbContext _context;
        private readonly AadhaarVerificationService _aadhaarService;

        public PatientService(AppDbContext context, AadhaarVerificationService aadhaarService)
        {
            _context = context;
            _aadhaarService = aadhaarService;
        }

        public Patient RegisterPatient(PatientRegisterRequestDto dto)
        {
            var aadhaarData = _aadhaarService.Verify(dto.AadhaarNumber);
            //1. Verify Aadhaar Number          
            if (aadhaarData == null) { throw new Exception("Aadhaar verification failed."); }

            //2. check duplicate registration

            if (_context.Patients.Any(p => p.AadhaarNumber == dto.AadhaarNumber))
            {
                throw new Exception("Patient with this Aadhaar number is already registered.");
            }

            //3. Create Patient Record
            var patient = new Patient
            {
                AadhaarNumber = aadhaarData.AadhaarNumber,
                Name = aadhaarData.Name,
                Gender = aadhaarData.Gender,
                DateOfBirth = aadhaarData.DateOfBirth,
                PhoneNumber = dto.PhoneNumber,
                RegistrationDate = DateTime.UtcNow,
                HealthCardNumber = GenerateHealthCardNumber()

            };

            _context.Patients.Add(patient);
            _context.SaveChanges();

            return patient;
        }
        private string GenerateHealthCardNumber()
        {
            return "DHC-" + Guid.NewGuid().ToString("N")[..10].ToUpper();
        }
    }
}
