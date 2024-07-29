namespace Althera.Models.Domain;

public record Patient
{
    public required string Id { get; init; }
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public string? HealthInsuranceNumber { get; init; }
    public required string ClinicId { get; init; }
}

