namespace Althera.Models.Api.Clinic;

public record ClinicModel
{
    public required string Id { get; init; }

    public required string Name { get; init; }

    public SiteModel? Site { get; set; }
}

public record SiteModel
{
    public required string Id { get; init; }
    public required string Name { get; init; }
    public string? Street { get; init; }
    public string? City { get; init; }
    public string? Zip { get; init; }
    public string Region { get; } = "QC";
    public string Country { get; } = "Canada";
}
