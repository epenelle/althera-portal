namespace Althera.Models.Api.Clinic;

public record ClinicModel
{
    public required string Id { get; init; }

    public required string Name { get; init; }

    public Site? Site { get; set; }
}
