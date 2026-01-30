using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("aadhaar_mock")]   // 🔥 THIS FIXES YOUR ISSUE
public class AadhaarMock
{
    [Key]
    public long AadhaarNumber { get; set; }

    public string Name { get; set; } = "";
    public DateTime DateOfBirth { get; set; }
    public string Gender { get; set; }
    public string Address { get; set; } = "";
    public long Mobile { get; set; }
}
