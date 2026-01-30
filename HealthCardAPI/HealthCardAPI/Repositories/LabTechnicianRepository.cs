using HealthCardAPI.Data;
using HealthCardAPI.Models;

namespace HealthCardAPI.Repositories
{
    public class LabTechnicianRepository : ILabTechnicianRepository
    {
        private readonly AppDbContext _context;

        public LabTechnicianRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<LabTechnician> GetAll()
        {
            return _context.LabTechnicians.ToList();
        }

        public LabTechnician Add(LabTechnician labTechnician)
        {
            _context.LabTechnicians.Add(labTechnician);
            _context.SaveChanges();
            return labTechnician;
        }
    }
}
