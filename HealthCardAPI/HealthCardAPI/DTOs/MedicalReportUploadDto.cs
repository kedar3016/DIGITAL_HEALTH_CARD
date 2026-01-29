using Microsoft.AspNetCore.Http;
using System;

namespace HealthCardAPI.DTOs
{
    public class MedicalReportUploadDto
    {
        public string ReportType { get; set; }
        public DateTime ReportDate { get; set; }
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public int LabTechId { get; set; }
        public string HealthCardId { get; set; }
        public IFormFile ReportFile { get; set; }
    }
}
