using Althera.Models.Api.Order;
using Althera.Models.Persistence;

namespace Althera.Services;

public class OrdersService
{
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
        foreach (var order in Allorder)
        {
            var orderModelService = new OrderModel
            {
                OrthesisModel = order.OrthosisModel,
                OrthesisInfo = order.OrthosisInformation,
                OrthesisScan = order.OrthosisScan,
                OrderDate = order.Date,
                OrderState = order.State,
                OrthesisComment = order.Comments,
                PatientId = order.PatientId
            };
            AllOrderModel.Add(orderModelService);
        }

        return AllOrderModel;
    }

    // Get order by ID
    public OrderModel? GetOrderById(int id)
    {
        var order = _dbContext.Orders.SingleOrDefault(c => c.Id == id);
        if (order != null)
        {
            return new OrderModel { OrthesisModel = order.OrthosisModel, OrthesisInfo = order.OrthosisInformation, OrthesisScan = order.OrthosisScan, OrderDate = order.Date, OrderState = order.State, OrthesisComment = order.Comments, PatientId = order.PatientId };
        }
        else
        {
            return null;
        }
    }

    // Create new Order
    public void CreateOrder(OrderModel order)
    {
        _dbContext.Orders.Add(new OrderEntity { OrthosisModel = order.OrthesisModel, OrthosisInformation = order.OrthesisInfo, OrthosisScan = order.OrthesisScan, Date = order.OrderDate, State = order.OrderState, Comments = order.OrthesisComment, PatientId = order.PatientId });
        _dbContext.SaveChanges();
    }

    // Edit order by Id
    public void UpdateOrder(int id, OrderModel updatedOrder)
    {
        var order = _dbContext.Orders.SingleOrDefault(c => c.Id == id);
        if (order != null)
        {
            order.OrthosisModel = updatedOrder.OrthesisModel;
            order.OrthosisInformation = updatedOrder.OrthesisInfo;
            order.OrthosisScan = updatedOrder.OrthesisScan;
            order.Date = updatedOrder.OrderDate;
            order.State = updatedOrder.OrderState;
            order.Comments = updatedOrder.OrthesisComment;
            order.PatientId = updatedOrder.PatientId;
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