using HealthCardAPI.Data;
using HealthCardAPI.Models;

namespace HealthCardAPI.Repositories
{
    public class PatientRepository : IPatientRepository
    {
        private readonly AppDbContext _context;

        public PatientRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Patient> GetAll()
        {
            return _context.Patients.ToList();
        }
        public bool ExistsByAadhaar(long aadhaarNumber)
        {
            return _context.Patients.Any(p => p.AadhaarNumber == aadhaarNumber);
        }
        public Nominee AddNominee(Nominee nominee)
        {
            _context.Nominees.Add(nominee);
            _context.SaveChanges();
            return nominee; // nominee.Id now available
        }

        public Patient Add(Patient patient)
        {
            _context.Patients.Add(patient);
            _context.SaveChanges();
            return patient;
        }
    }
}
