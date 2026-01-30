using HealthCardAPI.Models;
using HealthCardAPI.Model;// ✅ THIS LINE FIXES THE ERROR

using Microsoft.EntityFrameworkCore;

namespace HealthCardAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
      
        public DbSet<MedicalReport> MedicalReports { get; set; }
        public DbSet<Nominee> Nominees { get; set; }
        public DbSet<OtpVerification> OtpVerifications { get; set; }
        public DbSet<AadhaarMock> AadhaarMocks { get; set; }
        public DbSet<HospitalAdmin> HospitalAdmins { get; set; }
        public DbSet<LabTechnician> LabTechnicians { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed test user
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Username = "123456789012",
                    Password = "abc123",
                    Role = "Patient"
                }
            );
  


            // Seed test patient
            modelBuilder.Entity<Patient>().HasData(
                new Patient
                {
                    Id = 1,
                    AadhaarNumber = 123456789012,
                    Name = "Rahul Kumar Sharma",
                    DateOfBirth = new DateTime(1990, 5, 15),
                    Gender = "Male",
                    BloodGroup = "A+",
                    PhoneNumber = 7588111644,
                    Email = "rahul@example.com",
                    Address = "123 MG Road, Bangalore",
                    HealthCardNumber = "HC123456789012",
                    RegistrationDate = DateTime.Now,
                    NomineeId = 3016
                }
            );
            modelBuilder.Entity<HospitalAdmin>().HasData(
            new HospitalAdmin
            {
             Id = 1,
             Username = "admin",
             Password = "admin123"
             }
            );
        }
    }
}
