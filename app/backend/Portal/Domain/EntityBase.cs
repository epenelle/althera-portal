namespace Portal.Domain;

public abstract record EntityBase
{
    public required Guid Id { get; init; }

    public required DateTime CreatedAt { get; init; }

    public required DateTime UpdatedAt { get; init; }

    public DateTime? DeletedAt { get; init; } = null;
}
