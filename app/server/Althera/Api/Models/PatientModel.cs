namespace Althera.Api.Models;
public record PatientModel
{
    public required string Id { get; init; }
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public string? HealthInsuranceNumber { get; init; }
}
