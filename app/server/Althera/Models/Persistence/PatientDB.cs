using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Althera.Models.Persistence;

public record PatientDB
{
    [Key]
    public int Id { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public int? HealthInsuranceNumber { get; set; }

    [ForeignKey("clinicId")]
    public int ClinicId { get; set; }

    // Propriété de navigation
    public ClinicDB? Clinic { get; set; }

    // Propriété de navigation inverse
    public List<OrderDB>? Orders { get; } = [];
}
