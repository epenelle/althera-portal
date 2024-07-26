using Althera.Models.Api;
using Althera.Services;
using Microsoft.AspNetCore.Mvc;

namespace Althera.Controllers;

[ApiController]
[Route("[controller]")]
public class OrdersController : ControllerBase {
     private readonly OrdersService _ordersService;

    public OrdersController(OrdersService orderServices){
        _ordersService = orderServices;
    }

    // GET all action
    [HttpGet]
    public ActionResult<List<OrderModel>> GetAllOrders(){
        return _ordersService.GetAllOrders();
        
    }

    // GET by Id action
    [HttpGet("{id}")]
    public ActionResult<OrderModel> GetOrders(int id){
        var order = _ordersService.GetOrderById(id);
        if(order == null){
            return NotFound();
        }
        return order;
    }

    // POST action
    [HttpPost]
    public IActionResult CreateOrder(OrderModel order){
        if(order == null){
            return BadRequest();
        }
        _ordersService.CreateOrder(order);
        return StatusCode(201, order);
    }


    // PUT action (Modification/Edit)
    [HttpPut("{id}")]
    public IActionResult UpdateOrder(int id, OrderModel order){
        _ordersService.UpdateOrder(id, order);
        return NoContent();
    }


    // DELETE action
    [HttpDelete("{id}")]
    public IActionResult DeleteOrder(int id){
        _ordersService.DeleteOrder(id);
        return NoContent();
    }

}