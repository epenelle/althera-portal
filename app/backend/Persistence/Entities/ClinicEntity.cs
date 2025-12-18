using System.ComponentModel.DataAnnotations;

namespace Althera.Models.Persistence;

public record ClinicEntity
{
    [Key]
    public long Id { get; init; }
    public required string Name { get; set; }
    public string? Street { get; set; }
    public string? City { get; set; }
    public string? Zip { get; set; }
    //public string? Region { get; set; }
    //public string? Country { get; set; }

    // Reverse navigation property
    public List<PatientEntity>? Patients { get; } = [];
}