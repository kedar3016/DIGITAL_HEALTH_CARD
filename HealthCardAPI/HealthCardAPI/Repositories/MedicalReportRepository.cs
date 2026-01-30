using HealthCardAPI.Data;
using HealthCardAPI.Models;

namespace HealthCardAPI.Repositories
{
    public class MedicalReportRepository : IMedicalReportRepository
    {
        private readonly AppDbContext _context;

        public MedicalReportRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<MedicalReport> GetAll()
        {
            return _context.MedicalReports.ToList();
        }

        public MedicalReport Add(MedicalReport report)
        {
            _context.MedicalReports.Add(report);
            _context.SaveChanges();
            return report;
        }
    }
}
