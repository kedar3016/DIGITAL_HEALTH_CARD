using HealthCardAPI.Models;

namespace HealthCardAPI.Services
{
    public interface ILabTechnicianService
    {
        IEnumerable<LabTechnician> GetAllLabTechnicians();
        LabTechnician CreateLabTechnician(LabTechnician labTechnician);
    }
}
