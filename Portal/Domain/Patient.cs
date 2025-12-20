using Portal.Domain;

namespace Portal.Models;

public record Patient : EntityBase
{
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public string FullName => $"{FirstName} {LastName}";
    public string? Email { get; init; }
    public string? Phone { get; init; }
}