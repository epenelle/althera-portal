using Althera.Api.Requests;
using Althera.Domain;
using Althera.Extensions;
using Althera.Models.Persistence;
using Althera.Persistence;

namespace Althera.Services;

public class OrdersService(AppDbContext dbContext)
{
    private readonly AppDbContext _dbContext = dbContext;

    public List<Order> GetAll()
    {
        var orderEntities = _dbContext.Orders.ToList();
        return orderEntities.Select(order => order.ToDomain()).ToList();
    }

    public Order? GetOrder(string id)
    {
        var orderEntity = _dbContext.Orders.SingleOrDefault(c => c.Id == id);
        return orderEntity?.ToDomain();
    }

    public Order CreateOrder(OrderCreateRequest orderCreateRequest)
    {
        var orderEntity = new OrderEntity
        {
            // TOEXPLAIN => NO NEED TO GENERATE STRING ???????? ID (why string....) => DB AUTO GENERATE ID
            Id = Guid.NewGuid().ToString(),
            OrthosisModel = orderCreateRequest.OrthesisModel,
            OrthosisInformation = orderCreateRequest.OrthesisInfo,
            OrthosisScan = orderCreateRequest.OrthesisScan,
            Comments = orderCreateRequest.OrthesisComment,
            PatientId = orderCreateRequest.PatientId,
            Date = DateTime.UtcNow,
            State = "created", // TODO : Replace with enum
        };
        _dbContext.Orders.Add(orderEntity);
        _dbContext.SaveChanges();

        return orderEntity.ToDomain();
    }

    public Order UpdateOrder(string id, OrderUpdateRequest orderUpdateRequest)
    {
        var orderEntity = _dbContext.Orders.SingleOrDefault(c => c.Id == id) ?? throw new InvalidOperationException("Order not found.");
        orderEntity.OrthosisInformation = orderUpdateRequest.OrthesisInfo;
        orderEntity.Comments = orderUpdateRequest.OrthesisComment;
        orderEntity.PatientId = orderUpdateRequest.PatientId;
        _dbContext.SaveChanges();

        return orderEntity.ToDomain();
    }

    public void DeleteOrder(string id)
    {
        var order = _dbContext.Orders.SingleOrDefault(c => c.Id == id) ?? throw new InvalidOperationException("Order not found.");
        _dbContext.Orders.Remove(order);
        _dbContext.SaveChanges();
    }
}