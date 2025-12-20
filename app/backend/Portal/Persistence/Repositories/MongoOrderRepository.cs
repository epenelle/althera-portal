using Portal.Options;
using Portal.Persistence.Models;
using Portal.Services;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Portal.Repositories;

public class MongoOrderRepository : IOrderRepository
{
    private readonly IMongoCollection<OrderModel> _orders;
    
    public MongoOrderRepository(IOptions<MongoDBOptions> options)
    {
        MongoDBOptions mongoDBOptions = options.Value;
        MongoClient client = new MongoClient(mongoDBOptions.ConnectionString);
        IMongoDatabase database = client.GetDatabase(mongoDBOptions.DatabaseName);
        _orders = database.GetCollection<OrderModel>(mongoDBOptions.OrdersCollection);
    }
    public async Task<OrderModel> CreateAsync(Order order, CancellationToken cancellationToken)
    {
        OrderModel orderModel = order.FromDomain();
        await _orders.InsertOneAsync(orderModel, options: null, cancellationToken);
        return orderModel;
    }   
}