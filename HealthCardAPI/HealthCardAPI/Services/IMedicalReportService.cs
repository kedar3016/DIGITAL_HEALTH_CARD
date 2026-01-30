using HealthCardAPI.Models;

namespace HealthCardAPI.Services
{
    public interface IMedicalReportService
    {
        IEnumerable<MedicalReport> GetAllReports();
        MedicalReport CreateReport(MedicalReport report);
    }
}
