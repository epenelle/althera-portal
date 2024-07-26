using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Althera.Models.Persistence;

public record OrderDB
{
    [Key]
    public int orderId { get; set; }
    public string? orthesisModel { get; set; }
    public string? orthesisInfo { get; set; }
    public string? orthesisScan { get; set; }
    public DateTime? orderDate { get; set; }
    public string? orderState { get; set; }
    public string? orthesisComment { get; set; }

    [ForeignKey("patientId")]
    public int patientId { get; set; }

    // Navigation property
    public PatientDB? Patient { get; set; }
}
