using System.ComponentModel.DataAnnotations;
namespace Althera.Domain;

public record Patient
{
    [Key]
    public required long Id { get; init; }
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public string? HealthInsuranceNumber { get; init; }
    public required long ClinicId { get; init; }
}

