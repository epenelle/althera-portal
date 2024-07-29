using Althera.Models;
using Althera.Services;
using Microsoft.AspNetCore.Mvc;

namespace Althera.Controllers;

[ApiController]
[Route("[controller]")]
public class OrderController : ControllerBase {
     private readonly OrderServices _orderServices;

    public OrderController(OrderServices orderServices){
        _orderServices = orderServices;
    }

    // GET all action
    [HttpGet]
    public ActionResult<List<OrderModel>> GetAllOrders(){
        return _orderServices.GetAllOrders();
        
    }

    // GET by Id action
    [HttpGet("{id}")]
    public ActionResult<OrderModel> GetOrders(int id){
        var order = _orderServices.GetOrderById(id);
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
        _orderServices.CreateOrder(order);
        return StatusCode(201, order);
    }


    // PUT action (Modification/Edit)
    [HttpPut("{id}")]
    public IActionResult UpdateOrder(int id, OrderModel order){
        _orderServices.UpdateOrder(id, order);
        return NoContent();
    }


    // DELETE action
    [HttpDelete("{id}")]
    public IActionResult DeleteOrder(int id){
        _orderServices.DeleteOrder(id);
        return NoContent();
    }

}