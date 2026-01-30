using HealthCardAPI.Models;
using HealthCardAPI.Repositories;

namespace HealthCardAPI.Services
{
    public class DoctorService : IDoctorService
    {
        private readonly IDoctorRepository _repository;

        public DoctorService(IDoctorRepository repository)
        {
            _repository = repository;
        }

        public void AddDoctor(Doctor doctor)
        {
            _repository.Add(doctor);
        }
    }
}
