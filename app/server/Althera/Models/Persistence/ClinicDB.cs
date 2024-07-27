using System.ComponentModel.DataAnnotations;

namespace Althera.Models.Persistence;

public record ClinicDB
{
    [Key]
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Password { get; set; }
    public string? Address { get; set; }

    // Reverse navigation property
    public List<PatientDB>? Patients { get; } = [];
}