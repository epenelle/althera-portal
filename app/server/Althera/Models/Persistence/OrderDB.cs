using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Althera.Models.Persistence;

public record OrderDB
{
    [Key]
    public int Id { get; set; }
    public string? OrthosisModel { get; set; }
    public string? OrthosisInformation { get; set; }
    public string? OrthosisScan { get; set; }
    public DateTime? Date { get; set; }
    public string? State { get; set; }
    public string? Comments { get; set; }

    [ForeignKey("patientId")]
    public int PatientId { get; set; }

    // Navigation property
    public PatientDB? Patient { get; set; }
}
