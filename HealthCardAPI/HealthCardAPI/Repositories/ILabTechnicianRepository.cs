using HealthCardAPI.Models;

namespace HealthCardAPI.Repositories
{
    public interface ILabTechnicianRepository
    {
        IEnumerable<LabTechnician> GetAll();
        LabTechnician Add(LabTechnician labTechnician);
    }
}
