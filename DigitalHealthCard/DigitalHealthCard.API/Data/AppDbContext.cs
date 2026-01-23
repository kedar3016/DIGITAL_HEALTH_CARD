using DigitalHealthCard.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DigitalHealthCard.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Nominee> Nominees { get; set; }
        public DbSet<LabTechnician> LabTechnicians { get; set; }
        public DbSet<MedicalReport> MedicalReports { get; set; }
        public DbSet<Admin> Admins { get; set; }
    }
}
