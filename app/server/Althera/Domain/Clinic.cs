namespace Althera.Domain;

public record Clinic
{
    public required long Id { get; init; }

    public required string Name { get; init; }

    public Site? Address { get; init; }
}

public record Site
{
    public required long Id { get; init; }
    public required string Name { get; init; }
    public string? Street { get; init; }
    public string? City { get; init; }
    public string? Zip { get; init; }
    public string Region { get; } = "QC";
    public string Country { get; } = "Canada";
}