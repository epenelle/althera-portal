using Althera.Extensions;
using Althera.Models.Api.Order;
using Althera.Requests;
using Althera.Services;
using Microsoft.AspNetCore.Mvc;

namespace Althera.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class OrdersController(OrdersService orderServices) : ControllerBase
{
    private readonly OrdersService _ordersService = orderServices;

    [HttpGet]
    public ActionResult<List<OrderModel>> GetAllOrders()
    {
        return _ordersService.GetAll().Select(order => order.ToApi()).ToList();
    }

    [HttpGet("{id}")]
    public ActionResult<OrderModel> GetOrder(string id)
    {
        var order = _ordersService.GetOrder(id);
        return order == null ? NotFound() : order.ToApi();
    }

    [HttpPost]
    public ActionResult<OrderModel> CreateOrder(OrderCreateRequest orderCreateRequest)
    {
        if (orderCreateRequest == null)
        {
            return BadRequest();
        }

        var order = _ordersService.CreateOrder(orderCreateRequest);
        return StatusCode(201, order.ToApi());
    }

    [HttpPut("{id}")]
    public ActionResult<OrderModel> UpdateOrder(string id, OrderUpdateRequest orderUpdateRequest)
    {
        var order = _ordersService.UpdateOrder(id, orderUpdateRequest);
        return StatusCode(200, order.ToApi());
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteOrder(string id)
    {
        _ordersService.DeleteOrder(id);
        return NoContent();
    }
}