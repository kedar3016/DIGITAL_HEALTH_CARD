using HealthCardAPI.Models;

namespace HealthCardAPI.Repositories
{
    public interface IMedicalReportRepository
    {
        IEnumerable<MedicalReport> GetAll();
        MedicalReport Add(MedicalReport report);
    }
}
