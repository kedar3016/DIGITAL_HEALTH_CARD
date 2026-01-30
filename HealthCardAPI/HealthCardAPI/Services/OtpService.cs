using HealthCardAPI.Data;
using HealthCardAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace HealthCardAPI.Services
{
    public class OtpService : IOtpService
    {
        private readonly AppDbContext _context;
        private readonly ISmsService _smsService;

        // ✅ CONSTRUCTOR (VERY IMPORTANT)
        public OtpService(AppDbContext context, ISmsService smsService)
        {
            _context = context;
            _smsService = smsService;
        }

        public async Task<string> SendOtpAsync(long aadhaarNumber)
        {
            // 1️⃣ Fetch Aadhaar
            var aadhaar = await _context.AadhaarMocks
                .FirstOrDefaultAsync(a => a.AadhaarNumber == aadhaarNumber);

            if (aadhaar == null)
                throw new Exception("Aadhaar not found");

            // 2️⃣ Generate OTP
            var otp = new Random().Next(100000, 999999).ToString();

            // 3️⃣ Save OTP
            var otpEntity = new OtpVerification
            {
                AadhaarNumber = aadhaarNumber,
                Otp = otp,
                Expiry = DateTime.UtcNow.AddMinutes(5)
            };

            _context.OtpVerifications.Add(otpEntity);
            await _context.SaveChangesAsync();


            // 4️⃣ Send SMS (REAL DELIVERY)  For Testing Pause SMS Service
          //  await _smsService.SendOtpAsync(aadhaar.Mobile, otp);   

            // 5️⃣ Masked response
            return $"OTP sent to registered mobile ****{aadhaar.Mobile % 10000},OTP IS {otp}";


  }

        // ✅ IMPLEMENT VERIFY OTP
        public async Task<bool> VerifyOtpAsync(long aadhaarNumber, string otp)
        {
            var record = await _context.OtpVerifications
                .OrderByDescending(o => o.Expiry)
                .FirstOrDefaultAsync(o =>
                    o.AadhaarNumber == aadhaarNumber &&
                    o.Otp == otp &&
                    o.Expiry > DateTime.UtcNow);

            if (record == null)
                return false;

            // 🔐 Single-use OTP (DELETE AFTER SUCCESS)
            _context.OtpVerifications.Remove(record);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
