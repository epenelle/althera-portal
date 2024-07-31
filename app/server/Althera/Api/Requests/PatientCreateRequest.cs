namespace Althera.Api.Requests;
public record PatientCreateRequest
{
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public string? HealthInsuranceNumber { get; init; }
    public long ClinicId { get; init; }
}
