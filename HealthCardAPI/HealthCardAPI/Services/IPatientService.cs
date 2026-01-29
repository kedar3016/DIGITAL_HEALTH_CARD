using HealthCardAPI.DTOs;
using HealthCardAPI.Models;

namespace HealthCardAPI.Services
{
    public interface IPatientService
    {
        IEnumerable<Patient> GetAllPatients();
        Patient RegisterPatient(RegisterPatientDto dto);
        Task<string> SendOtpAsync(long aadhaarNumber);
        Task<bool> VerifyOtpAsync(long aadhaarNumber, string otp);
    }
}
