using Portal.Domain;

namespace Portal.Dto;

public class PatientSummary
{
    public required Guid PatientId { get; init; }
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
}

public class OrthosisDetails
{
    public required string Limb { get; init; }
    public required LimbSide Side { get; init; }
    public required string ModelId { get; init; }
    public Dictionary<string, string> Measurements { get; init; } = [];
}

public class OrderResponse
{
    public required Guid Id { get; init; }
    public required PatientSummary Patient { get; init; }
    public required OrthosisDetails Orthosis { get; init; }
    public string? ScanId { get; init; }
    public required OrderStatus Status { get; init; }
    public required DateTime CreatedAt { get; init; }
    public required DateTime UpdatedAt { get; init; }
}
