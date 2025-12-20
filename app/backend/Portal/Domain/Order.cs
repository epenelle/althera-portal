using Portal.Domain;

namespace Portal.Services;

public record Order : EntityBase
{
    public required Guid PatientId { get; init; }
    // TODO : Regroup Limb, Side and Measurements into a single object as they are related. It must be seen as a virtual representation of the limb.
    // TODO : Each limb could be represented by its own class in the future.
    public required string Limb { get; init; }
    public required LimbSide Side { get; init; }
    public Dictionary<string, string> Measurements { get; init; } = [];
    public required string OrthoseModelId { get; init; }
    // TODO : Not sure if ScanId should be an URI
    public string? ScanId { get; init; }
}