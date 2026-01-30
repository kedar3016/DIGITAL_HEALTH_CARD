namespace HealthCardAPI.DTOs
{
    public class VerifyLoginOtpDto
    {
        public long AadhaarNumber { get; set; }
        public string Otp { get; set; }
    }
}
