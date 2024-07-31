using System.ComponentModel.DataAnnotations;
namespace Althera.Api.Models;

public record ClinicModel
{
    [Key]
    public required long Id { get; init; }

    public required string Name { get; init; }

    public SiteModel? Site { get; set; }
}

public record SiteModel
{
    public required long Id { get; init; }
    public required string Name { get; init; }
    public string? Street { get; init; }
    public string? City { get; init; }
    public string? Zip { get; init; }
    public string Region { get; } = "QC";
    public string Country { get; } = "Canada";
}
