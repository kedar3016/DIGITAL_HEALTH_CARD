using HealthCardAPI.Data;
using HealthCardAPI.DTOs;
using HealthCardAPI.Models;
using HealthCardAPI.Repositories;
using HealthCardAPI.Services;
using Microsoft.EntityFrameworkCore;

public class PatientService : IPatientService
{
    private readonly IPatientRepository _repository;
    private readonly AppDbContext _context;
    private readonly ISmsService _smsService;

    public PatientService(
        IPatientRepository repository,
        AppDbContext context,
        ISmsService smsService)
    {
        _repository = repository;
        _context = context;
        _smsService = smsService;
    }

    public Patient RegisterPatient(RegisterPatientDto dto)
    {
        // Prevent duplicate Aadhaar
        if (_repository.ExistsByAadhaar(dto.AadhaarNumber))
            throw new Exception("Patient already registered");

        Nominee nominee = null;

        if (!string.IsNullOrEmpty(dto.NomineeName))
        {
            nominee = new Nominee
            {
                Name = dto.NomineeName,
                Relation = dto.NomineeRelation,
                PhoneNumber = dto.NomineePhone
            };

            _repository.AddNominee(nominee);
        }

        var patient = new Patient
        {
            AadhaarNumber = dto.AadhaarNumber,
            Name = dto.Name,
            DateOfBirth = dto.DateOfBirth,
            Gender = dto.Gender,
            Address = dto.Address,
            Email = dto.Email,
            BloodGroup = dto.BloodGroup,
            PhoneNumber = dto.PhoneNumber,
            NomineeId = nominee?.Id,
            HealthCardNumber = GenerateHealthCardNumber(),
            RegistrationDate = DateTime.UtcNow
        };

        return _repository.Add(patient);
    }

    private string GenerateHealthCardNumber()
    {
        return $"HC-{DateTime.UtcNow.Year}-{Random.Shared.Next(100000, 999999)}";
    }


    public IEnumerable<Patient> GetAllPatients()
    {
        throw new NotImplementedException();
    }
    public async Task<string> SendOtpAsync(long aadhaarNumber)
    {
        // 1️⃣ Find Aadhaar record
        var aadhaar = await _context.AadhaarMocks
            .FirstOrDefaultAsync(a => a.AadhaarNumber == aadhaarNumber);

        if (aadhaar == null)
            throw new Exception("Aadhaar not found");

        // 2️⃣ Generate OTP
        var otp = new Random().Next(100000, 999999).ToString();

        // 3️⃣ Save OTP to DB
        var otpEntity = new OtpVerification
        {
            AadhaarNumber = aadhaarNumber,
            Otp = otp,
            Expiry = DateTime.UtcNow
        };

        _context.OtpVerifications.Add(otpEntity);
        await _context.SaveChangesAsync();

        // 4️⃣ Send OTP to registered mobile
        await _smsService.SendOtpAsync(aadhaar.Mobile, otp);

        // 5️⃣ Return masked response
        return $"OTP sent to registered mobile ****{aadhaar.Mobile % 10000}";
    }
    public async Task<bool> VerifyOtpAsync(long aadhaarNumber, string inputOtp)
    {
        var otpRecord = await _context.OtpVerifications
            .OrderByDescending(o => o.Expiry)
            .FirstOrDefaultAsync(o => o.AadhaarNumber == aadhaarNumber);

        if (otpRecord == null)
            return false;

        // Optional: expiry check (5 minutes)
        if ((DateTime.UtcNow - otpRecord.Expiry).TotalMinutes > 5)
            return false;

        return otpRecord.Otp == inputOtp;
    }

}
