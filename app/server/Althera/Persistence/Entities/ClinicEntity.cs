using System.ComponentModel.DataAnnotations;

namespace Althera.Models.Persistence;

public record ClinicEntity
{
    [Key]
    public required string Id { get; init; }
    public required string Name { get; set; }
    public string? Street { get; set; }
    public string? City { get; set; }
    public string? Zip { get; set; }
    public string Region { get; } = "QC";
    public string Country { get; } = "Canada";

    // Reverse navigation property
    public List<PatientEntity>? Patients { get; } = [];
}