using Portal.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Portal.Persistence.Models;

public class PatientModel
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public ObjectId Id { get; init; }

    [BsonRequired]
    [BsonGuidRepresentation(GuidRepresentation.Standard)]
    public required Guid PatientId { get; init; }

    [BsonRequired]
    public required DateTime CreatedAt { get; init; }
    
    [BsonRequired]
    public required DateTime UpdatedAt { get; init; }
    
    [BsonRequired]
    public required string FirstName { get; init; }
    
    [BsonRequired]
    public required string LastName { get; init; }

    [BsonIgnoreIfNull]
    public required string? Email { get; init; }
    
    [BsonIgnoreIfNull]
    public required string? Phone { get; init; }
}

public static class PatientModelExtensions
{
    public static PatientModel FromDomain(this Patient patient)
    {
        return new PatientModel
        {
            Id = ObjectId.GenerateNewId(),
            PatientId = patient.Id,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            FirstName = patient.FirstName,
            LastName = patient.LastName,
            Email = patient.Email,
            Phone = patient.Phone,
        };
    }

    public static Patient ToDomain(this PatientModel patientModel)
    {
        return new Patient
        {
            Id = patientModel.PatientId,
            FirstName = patientModel.FirstName,
            LastName = patientModel.LastName,
            Email = patientModel.Email,
            Phone = patientModel.Phone,
            CreatedAt = patientModel.CreatedAt,
            UpdatedAt = patientModel.UpdatedAt,
        };
    }
}
