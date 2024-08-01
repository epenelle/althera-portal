using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Althera.Models.Persistence;

public record PatientEntity
{
    [Key]
    public long Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public string? HealthInsuranceNumber { get; set; }

    [ForeignKey("clinicId")]
    public required long ClinicId { get; set; }

    // Propriété de navigation
    public ClinicEntity? Clinic { get; set; }

    // Propriété de navigation inverse
    public List<OrderEntity>? Orders { get; } = [];
}
