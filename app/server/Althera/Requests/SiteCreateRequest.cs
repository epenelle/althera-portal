namespace Althera.Requests;
public record SiteCreateRequest
{
    public required string Name { get; init; }
    public string? Street { get; init; }
    public string? City { get; init; }
    public string? Zip { get; init; }
}
