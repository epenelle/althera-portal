namespace Althera.Api.Requests;
public record PatientUpdateRequest
{
    public string? FirstName { get; init; }
    public string? LastName { get; init; }
    public string? HealthInsuranceNumber { get; init; }
}
