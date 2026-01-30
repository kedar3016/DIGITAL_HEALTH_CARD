using HealthCardAPI.Models;
using HealthCardAPI.Repositories;

namespace HealthCardAPI.Services
{
    public class MedicalReportService : IMedicalReportService
    {
        private readonly IMedicalReportRepository _repository;

        public MedicalReportService(IMedicalReportRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<MedicalReport> GetAllReports()
        {
            return _repository.GetAll();
        }

        public MedicalReport CreateReport(MedicalReport report)
        {
            return _repository.Add(report);
        }
    }
}
