using System.ComponentModel.DataAnnotations;
namespace Althera.Api.Models;

public record PatientModel
{
    [Key]
    public required long Id { get; init; }
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public string? HealthInsuranceNumber { get; init; }
}
