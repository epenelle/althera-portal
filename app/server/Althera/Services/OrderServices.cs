
using System;
using System.Collections.Generic;
using System.Linq;
using Althera.Models;

namespace Althera.Services;

public class OrderServices {
    private readonly AppDbContext _dbContext;

    public OrderServices(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Orders

    // Get All Orders
    public List<OrderModel> GetAllOrders()
    {
        var Allorder = _dbContext.Orders.ToList();
        var AllOrderModel = new List<OrderModel>();
        foreach (var order in AllOrderModel) {
            var orderModelService = new OrderModel{ orthesisModel= order.orthesisModel, orthesisInfo= order.orthesisInfo, orthesisScan= order.orthesisScan, orderDate= order.orderDate, orderState = order.orderState, orthesisComment= order.orthesisComment, patientId=order.patientId };
            AllOrderModel.Add(orderModelService);
        }
        return AllOrderModel;
    }

    // Get order by ID
    public OrderModel? GetOrderById(int id)
    {
        var order = _dbContext.Orders.SingleOrDefault(c => c.orderId == id);
        if(order != null) return new OrderModel{orthesisModel= order.orthesisModel, orthesisInfo= order.orthesisInfo, orthesisScan= order.orthesisScan, orderDate= order.orderDate, orderState = order.orderState, orthesisComment= order.orthesisComment, patientId= order.patientId};
        else return null;
    }

    // Create new Order
    public void CreateOrder(OrderModel order)
    {
        _dbContext.Orders.Add(new OrderDB{orthesisModel= order.orthesisModel, orthesisInfo= order.orthesisInfo, orthesisScan= order.orthesisScan, orderDate= order.orderDate, orderState = order.orderState, orthesisComment= order.orthesisComment, patientId= order.patientId});
        _dbContext.SaveChanges();
    }

    // Edit order by Id
    public void UpdateOrder(int id, OrderModel updatedOrder)
    {
        var order = _dbContext.Orders.SingleOrDefault(c => c.orderId == id);
        if (order != null)
        {
            order.orthesisModel = updatedOrder.orthesisModel;
            order.orthesisInfo = updatedOrder.orthesisInfo;
            order.orthesisScan = updatedOrder.orthesisScan;
            order.orderDate = updatedOrder.orderDate;
            order.orderState = updatedOrder.orderState;
            order.orthesisComment = updatedOrder.orthesisComment;
            order.patientId = updatedOrder.patientId;
            _dbContext.SaveChanges();
        }
    }

    // Delete Order by ID
    public void DeleteOrder(int id)
    {
        var order = _dbContext.Orders.SingleOrDefault(c => c.orderId == id);
        if (order != null)
        {
            _dbContext.Orders.Remove(order);
            _dbContext.SaveChanges();
        }
    }
}