namespace Althera.Models.Api.Clinic;

public record Site
{
    public required string Id { get; init; }
    public required string Name { get; init; }
    public string? Street { get; init; }
    public string? City { get; init; }
    public string? Zip { get; init; }
    public string Region { get; } = "QC";
    public string Country { get; } = "Canada";
}
