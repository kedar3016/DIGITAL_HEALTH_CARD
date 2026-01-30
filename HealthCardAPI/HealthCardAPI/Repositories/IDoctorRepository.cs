using HealthCardAPI.Models;
using System.Collections.Generic;

namespace HealthCardAPI.Repositories
{
    public interface IDoctorRepository
    {
        void Add(Doctor doctor);
        IEnumerable<Doctor> GetAll();
    }
}
