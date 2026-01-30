using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class OtpVerification
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public long? AadhaarNumber { get; set; }
    public long? PhoneNumber { get; set; }
    public string Otp { get; set; } = "";
    public DateTime Expiry { get; set; }
}
