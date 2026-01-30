using HealthCardAPI.Models;

namespace HealthCardAPI.Repositories
{
    public interface IPatientRepository
    {
        IEnumerable<Patient> GetAll();
        Patient Add(Patient patient);
        bool ExistsByAadhaar(long aadhaarNumber);
        Nominee AddNominee(Nominee nominee);
    }
}
