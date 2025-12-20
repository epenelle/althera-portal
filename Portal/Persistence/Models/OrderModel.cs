using Portal.Domain;
using Portal.Models;
using Portal.Services;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Portal.Persistence.Models;

public class OrderModel
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public ObjectId Id { get; init; }

    [BsonRequired]
    [BsonGuidRepresentation(GuidRepresentation.Standard)]
    public required Guid OrderId { get; init; }

    [BsonRequired]
    [BsonGuidRepresentation(GuidRepresentation.Standard)]
    public required Guid PatientId { get; init; }

    [BsonRequired]
    public string Limb { get; init; } = string.Empty;
    
    [BsonRepresentation(BsonType.String)]
    public LimbSide Side { get; init; } = LimbSide.None;

    [BsonRequired]
    public required string OrthoseModelId { get; init; }

    public Dictionary<string, string> Measurements { get; init; } = [];

    public string? ScanId { get; init; } = null;

    [BsonRequired]
    public required DateTime CreatedAt { get; init; }
    
    [BsonRequired]
    public required DateTime UpdatedAt { get; init; }
}

public static class OrderModelExtensions
{
    public static OrderModel FromDomain(this Order order)
    {
        return new OrderModel
        {
            Id = ObjectId.GenerateNewId(),
            OrderId = order.Id,
            PatientId = order.PatientId,
            Limb = order.Limb,
            Side = order.Side,
            Measurements = order.Measurements,
            OrthoseModelId = order.OrthoseModelId,
            ScanId = order.ScanId,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
        };
    }

    public static Order ToDomain(this OrderModel orderModel)
    {
        return new Order
        {
            Id = orderModel.OrderId,
            PatientId = orderModel.PatientId,
            Limb = orderModel.Limb,
            Side = orderModel.Side,
            Measurements = orderModel.Measurements,
            OrthoseModelId = orderModel.OrthoseModelId,
            ScanId = orderModel.ScanId,
            CreatedAt = orderModel.CreatedAt,
            UpdatedAt = orderModel.UpdatedAt,
        };
    }
}
