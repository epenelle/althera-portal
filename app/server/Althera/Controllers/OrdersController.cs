using Althera.Models.Api.Order;
using Althera.Services;
using Microsoft.AspNetCore.Mvc;

namespace Althera.Controllers;

[ApiController]
[Route("[controller]")]
public class OrdersController : ControllerBase
{
    private readonly OrdersService _ordersService;

    public OrdersController(OrdersService orderServices)
    {
        _ordersService = orderServices;
    }

    [HttpGet]
    public ActionResult<List<OrderModel>> GetAllOrders()
    {
        return _ordersService.GetAllOrders();
    }

    [HttpGet("{id}")]
    public ActionResult<OrderModel> GetOrders(int id)
    {
        var order = _ordersService.GetOrderById(id);
        if (order == null)
        {
            return NotFound();
        }

        return order;
    }

    [HttpPost]
    public IActionResult CreateOrder(OrderModel order)
    {
        if (order == null)
        {
            return BadRequest();
        }

        _ordersService.CreateOrder(order);
        return StatusCode(201, order);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateOrder(int id, OrderModel order)
    {
        _ordersService.UpdateOrder(id, order);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteOrder(int id)
    {
        _ordersService.DeleteOrder(id);
        return NoContent();
    }
}