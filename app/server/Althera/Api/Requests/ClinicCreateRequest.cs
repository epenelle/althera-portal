namespace Althera.Api.Requests;
public record ClinicCreateRequest
{
    public required string Name { get; init; }
    public string? Street { get; init; }
    public string? City { get; init; }
    public string? Zip { get; init; }
}
