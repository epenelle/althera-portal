namespace Althera.Models.Domain;

public record Order
{
    public required string Id { get; init; }
    public string? OrthosisModel { get; set; }
    public string? OrthosisInformation { get; set; }
    public string? OrthosisScan { get; set; }
    public DateTime? Date { get; set; }
    public string? State { get; set; }
    public string? Comments { get; set; }

    public Patient? Patient { get; init; }
}
