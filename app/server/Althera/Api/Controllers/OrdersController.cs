using Althera.Api.Models;
using Althera.Api.Requests;
using Althera.Extensions;
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
        try{
            var orders = _ordersService.GetAll().Select(order => order.ToApi()).ToList();

            if(orders == null){
                return NotFound("No Orders Found");
            }

            // Same as Return 200
            return Ok(orders);
        }
        catch (ArgumentNullException argEx)
        {
            // Exception Null Args
            return BadRequest("Invalid argument: " + argEx.Message);
        }
        catch (InvalidOperationException invOpEx)
        {
            // Exception invalide operation
            return StatusCode(400, "Invalid operation: " + invOpEx.Message);
        }
        catch (Exception ex)
        {
            // Exception other error
            return StatusCode(500, "Internal Server error: " + ex.Message);
        }
    }

    [HttpGet("{id}")]
    public ActionResult<OrderModel> GetOrder(long id)
    {

        try {
            var order = _ordersService.GetOrder(id);

            if(order == null){
                return NotFound("No Orders Found");
            }
            // Same as Return 200
            return Ok(order.ToApi());
        }
        catch (ArgumentNullException argEx)
        {
            // Exception Null Args
            return BadRequest("Invalid argument: " + argEx.Message);
        }
        catch (InvalidOperationException invOpEx)
        {
            // Exception invalide operation
            return StatusCode(400, "Invalid operation: " + invOpEx.Message);
        }
        catch (Exception ex)
        {
            // Exception other error
            return StatusCode(500, "Internal Server error: " + ex.Message);
        }
    }

    [HttpPost]
    public ActionResult<OrderModel> CreateOrder(OrderCreateRequest orderCreateRequest)
    {
        try {
            if (orderCreateRequest == null)
            {
                return BadRequest();
            }

            var order = _ordersService.CreateOrder(orderCreateRequest);
            if(order == null){
                return StatusCode(500, "Error Server");
            }
            // Return code 201 => Create Successsfull
            return StatusCode(201, order.ToApi());
        }
        catch (InvalidOperationException invOpEx)
        {
            return StatusCode(404, invOpEx.Message);
        }
        catch (Exception ex)
        {
            // Exception other error
            return StatusCode(500, "Internal Server error: " + ex.Message);
        }
    }

    [HttpPut("{id}")]
    public ActionResult<OrderModel> UpdateOrder(long id, OrderUpdateRequest orderUpdateRequest)
    {
        try
        {
            if (orderUpdateRequest == null)
            {
                return BadRequest();
            }
            
            var orderById = _ordersService.GetOrder(id);
            
            if (orderById == null)
            {
                return NotFound("order Not Found");
            }

            var order = _ordersService.UpdateOrder(id, orderUpdateRequest);

            if (order == null)
            {
                return BadRequest();
            }
            
            // Same as Return 200
            return Ok(order.ToApi());
        }
        catch (ArgumentNullException argEx)
        {
            // Exception Null Args
            return BadRequest("Invalid argument: " + argEx.Message);
        }
        catch (InvalidOperationException invOpEx)
        {
            // Exception invalide operation
            return StatusCode(400, "Invalid operation: " + invOpEx.Message);
        }
        catch (Exception ex)
        {
            // Exception other error
            return StatusCode(500, "Internal Server error: " + ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteOrder(long id)
    {
        try
        {
            var order = _ordersService.GetOrder(id);

            if (order == null)
            {
                return NotFound("Order Not Found");
            }

            _ordersService.DeleteOrder(id);

            // Return 204 No Content
            return NoContent();

        }
        catch (ArgumentNullException argEx)
        {
            // Exception Null Args
            return BadRequest("Invalid argument: " + argEx.Message);
        }
        catch (InvalidOperationException invOpEx)
        {
            // Exception invalide operation
            return StatusCode(400, "Invalid operation: " + invOpEx.Message);
        }
        catch (Exception ex)
        {
            // Exception other error
            return StatusCode(500, "Internal Server error: " + ex.Message);
        }
    }
}