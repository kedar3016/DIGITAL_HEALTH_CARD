namespace HealthCardAPI.Services
{
    public interface ISmsService
    {
        Task SendOtpAsync(long mobile, string otp);
    }

}
