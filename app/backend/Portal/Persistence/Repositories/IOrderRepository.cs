using Portal.Persistence.Models;
using Portal.Services;

namespace Portal.Repositories;

public interface IOrderRepository
{
    Task<OrderModel> CreateAsync(Order order, CancellationToken cancellationToken);
    Task<List<OrderModel>> GetAllAsync(CancellationToken cancellationToken);
}