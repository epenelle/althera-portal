using Althera.Api.Requests;
using Althera.Domain;
using Althera.Extensions;
using Althera.Models.Persistence;
using Althera.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Althera.Services;

public class OrdersService
{
    private readonly AppDbContext _dbContext;

    public OrdersService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public List<Order> GetAll()
    {
        var orderEntities = _dbContext.Orders.Include(o => o.Patient).ToList();
        return orderEntities.Select(order => order.ToDomain()).ToList();
    }

    public Order? GetOrder(long id)
    {
        var orderEntity = _dbContext.Orders.Include(o => o.Patient).SingleOrDefault(c => c.Id == id);
        return orderEntity?.ToDomain();
    }

    public List<Order> GetOrdersByPatientId(long patientId)
    {
        var orderEntities = _dbContext.Orders
            .Include(o => o.Patient)
            .Where(o => o.PatientId == patientId)
            .ToList();

        return orderEntities.Select(order => order.ToDomain()).ToList();
    }

    public Order CreateOrder(OrderCreateRequest orderCreateRequest)
    {
        var patientEntity = _dbContext.Patients.SingleOrDefault(p => p.Id == orderCreateRequest.PatientId) ??
                            throw new InvalidOperationException($"Patient with id {orderCreateRequest.PatientId} not found.");

        var orderEntity = new OrderEntity
        {
            OrthosisModel = orderCreateRequest.OrthesisModel,
            OrthosisInformation = orderCreateRequest.OrthesisInfo,
            OrthosisScan = orderCreateRequest.OrthesisScan,
            Comments = orderCreateRequest.OrthesisComment,
            PatientId = patientEntity.Id,
            Patient = patientEntity,
            Date = DateTime.UtcNow,
            State = OrderState.Submitted,
        };
        _dbContext.Orders.Add(orderEntity);
        _dbContext.SaveChanges();

        return orderEntity.ToDomain();
    }

    public Order UpdateOrder(long id, OrderUpdateRequest orderUpdateRequest)
    {
        var patientEntity = _dbContext.Patients.SingleOrDefault(p => p.Id == orderUpdateRequest.PatientId) ??
                            throw new InvalidOperationException($"Patient with id {orderUpdateRequest.PatientId} not found.");

        var orderEntity = _dbContext.Orders.SingleOrDefault(c => c.Id == id) ?? throw new InvalidOperationException("Order not found.");
        orderEntity.OrthosisInformation = orderUpdateRequest.OrthesisInfo;
        orderEntity.Comments = orderUpdateRequest.OrthesisComment;
        orderEntity.PatientId = patientEntity.Id;
        orderEntity.Patient = patientEntity;
        _dbContext.SaveChanges();

        return orderEntity.ToDomain();
    }
/*
    public void DeleteOrder(long id)
    {
        var order = _dbContext.Orders.SingleOrDefault(c => c.Id == id) ?? throw new InvalidOperationException("Order not found.");
        _dbContext.Orders.Remove(order);
        _dbContext.SaveChanges();
    } */
    public void DeleteOrder(long id)
    {
        var order = _dbContext.Orders.SingleOrDefault(c => c.Id == id);
        if(order != null){
            order.IsDeleted = true;
            order.DeleteTime = DateTime.UtcNow;
            _dbContext.SaveChangesAsync();
        }
    }
}