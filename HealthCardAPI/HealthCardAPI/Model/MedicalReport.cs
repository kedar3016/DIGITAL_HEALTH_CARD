namespace HealthCardAPI.Models
{
    public class MedicalReport
    {
        public int Id { get; set; }

        public int PatientId { get; set; }
        public Patient Patient { get; set; }

        public string ReportName { get; set; }
        public string FilePath { get; set; }
        public DateTime UploadedAt { get; set; }

        public string HealthCardId { get; set; }
        public string UploadedByRole { get; set; }   // "Doctor", "Lab", "Patient"
        public int? UploadedById { get; set; }       // DoctorId / LabTechnicianId / null
    }

}
