using HealthCardAPI.Data;
using HealthCardAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/aadhaar")]
public class AadhaarController : ControllerBase
{
    private readonly IOtpService _otpService;
    private readonly AppDbContext _db;

    public AadhaarController(IOtpService otpService, AppDbContext db)
    {
        _otpService = otpService;
        _db = db;
    }

    // STEP 1: SEND OTP
    [HttpPost("send-otp")]
    public async Task<IActionResult> SendOtp([FromBody] SendOtpDto dto)
    {
        if (dto.AadhaarNumber.ToString().Length != 12)
            return BadRequest("Invalid Aadhaar number");

        var message = await _otpService.SendOtpAsync(dto.AadhaarNumber);
        return Ok(new { message });
    }

    // STEP 2: VERIFY OTP
    [HttpPost("verify-otp")]
    public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpDto dto)
    {
        var isValid = await _otpService.VerifyOtpAsync(dto.AadhaarNumber, dto.Otp);

        if (!isValid)
            return BadRequest("Invalid or expired OTP");

        var aadhaar = await _db.AadhaarMocks
            .FirstOrDefaultAsync(a => a.AadhaarNumber == dto.AadhaarNumber);

        if (aadhaar == null)
            return BadRequest("Aadhaar data not found");

        return Ok(new
        {
            aadhaar.Name,
            aadhaar.DateOfBirth,
            aadhaar.Gender, // or store in mock if you want
            aadhaar.Address,
            aadhaar.Mobile
        });
    }

}
