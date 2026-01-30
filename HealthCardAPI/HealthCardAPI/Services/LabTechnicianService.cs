using HealthCardAPI.Models;
using HealthCardAPI.Repositories;

namespace HealthCardAPI.Services
{
    public class LabTechnicianService : ILabTechnicianService
    {
        private readonly ILabTechnicianRepository _repository;

        public LabTechnicianService(ILabTechnicianRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<LabTechnician> GetAllLabTechnicians()
        {
            return _repository.GetAll();
        }

        public LabTechnician CreateLabTechnician(LabTechnician labTechnician)
        {
            return _repository.Add(labTechnician);
        }
    }
}
