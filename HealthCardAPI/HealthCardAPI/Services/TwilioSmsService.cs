using Microsoft.Extensions.Configuration;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace HealthCardAPI.Services
{
    public class TwilioSmsService : ISmsService
    {
        private readonly IConfiguration _config;

        public TwilioSmsService(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendOtpAsync(long mobile, string otp)
        {
            var accountSid = _config["Twilio:AccountSid"];
            var authToken = _config["Twilio:AuthToken"];
            var from = _config["Twilio:FromPhoneNumber"];

            TwilioClient.Init(accountSid, authToken);

            await MessageResource.CreateAsync(
                body: $"Your AarogyaCard OTP is {otp}. Valid for 5 minutes.",
                from: new Twilio.Types.PhoneNumber(from),
                to: new Twilio.Types.PhoneNumber($"+91{mobile}") // India number
            );
        }
    }
}
