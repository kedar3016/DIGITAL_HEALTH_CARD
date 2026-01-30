namespace HealthCardAPI.Services
{
    public interface IOtpService
    {
        Task<string> SendOtpAsync(long aadhaarNumber);
        Task<bool> VerifyOtpAsync(long aadhaarNumber, string otp);
    }
}
