using HealthCardAPI.Models;

namespace HealthCardAPI.Services
{
    public interface IJwtService
    {
        string GenerateToken(string userId, string name, string role);
    }
}
