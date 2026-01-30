using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Net.Http.Headers;
using static System.Net.WebRequestMethods;


namespace HealthCardAPI.Services
{
   

    public class Fast2SmsService : ISmsService
    {
        private readonly IConfiguration _config;
        private readonly HttpClient _httpClient;

        public Fast2SmsService(IConfiguration config, HttpClient httpClient)
        {
            _config = config;
            _httpClient = httpClient;
        }

        public async Task SendOtpAsync(long mobile, string otp)
        {
            var apiKey = _config["Sms:Fast2SmsApiKey"];

            var url =
                $"https://www.fast2sms.com/dev/bulkV2" +
                $"?authorization={apiKey}" +
                $"&route=otp" +
                $"&variables_values={otp}" +
                $"&numbers={mobile}";

            var request = new HttpRequestMessage(HttpMethod.Get, url);
            request.Headers.Add("cache-control", "no-cache");

            var response = await _httpClient.SendAsync(request);
            var responseBody = await response.Content.ReadAsStringAsync();

            // 🔥 THIS IS THE KEY PART
            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Fast2SMS failed: {responseBody}");
            }

            // Optional: log success
            Console.WriteLine("Fast2SMS response: " + responseBody);
        }
    }

}
