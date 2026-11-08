using Portal.Dto;

namespace Portal.Services;

public interface IOrderService
{
    Task<Order> CreateOrderAsync(OrderCreateRequest orderCreateRequest, CancellationToken cancellationToken);
    Task<List<OrderResponse>> GetOrdersAsync(CancellationToken cancellationToken);
}
