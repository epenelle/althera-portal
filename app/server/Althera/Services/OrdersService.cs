using Althera.Models.Api;
using Althera.Models.Persistence;

namespace Althera.Services;

public class OrdersService {
    private readonly AppDbContext _dbContext;

    public OrdersService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Orders

    // Get All Orders
    public List<OrderModel> GetAllOrders()
    {
        var Allorder = _dbContext.Orders.ToList();
        var AllOrderModel = new List<OrderModel>();
        foreach (var order in Allorder) {
            var orderModelService = new OrderModel{ orthesisModel= order.OrthosisModel, orthesisInfo= order.OrthosisInformation, orthesisScan= order.OrthosisScan, orderDate= order.Date, orderState = order.State, orthesisComment= order.Comments, patientId=order.PatientId };
            AllOrderModel.Add(orderModelService);
        }
        return AllOrderModel;
    }

    // Get order by ID
    public OrderModel? GetOrderById(int id)
    {
        var order = _dbContext.Orders.SingleOrDefault(c => c.Id == id);
        if(order != null) return new OrderModel{orthesisModel= order.OrthosisModel, orthesisInfo= order.OrthosisInformation, orthesisScan= order.OrthosisScan, orderDate= order.Date, orderState = order.State, orthesisComment= order.Comments, patientId= order.PatientId };
        else return null;
    }

    // Create new Order
    public void CreateOrder(OrderModel order)
    {
        _dbContext.Orders.Add(new OrderDB{OrthosisModel= order.orthesisModel, OrthosisInformation= order.orthesisInfo, OrthosisScan= order.orthesisScan, Date= order.orderDate, State = order.orderState, Comments= order.orthesisComment, PatientId= order.patientId });
        _dbContext.SaveChanges();
    }

    // Edit order by Id
    public void UpdateOrder(int id, OrderModel updatedOrder)
    {
        var order = _dbContext.Orders.SingleOrDefault(c => c.Id == id);
        if (order != null)
        {
            order.OrthosisModel = updatedOrder.orthesisModel;
            order.OrthosisInformation = updatedOrder.orthesisInfo;
            order.OrthosisScan = updatedOrder.orthesisScan;
            order.Date = updatedOrder.orderDate;
            order.State = updatedOrder.orderState;
            order.Comments = updatedOrder.orthesisComment;
            order.PatientId = updatedOrder.patientId;
            _dbContext.SaveChanges();
        }
    }

    // Delete Order by ID
    public void DeleteOrder(int id)
    {
        var order = _dbContext.Orders.SingleOrDefault(c => c.Id == id);
        if (order != null)
        {
            _dbContext.Orders.Remove(order);
            _dbContext.SaveChanges();
        }
    }
}