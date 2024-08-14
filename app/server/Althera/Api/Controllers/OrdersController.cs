using Althera.Api.Models;
using Althera.Api.Requests;
using Althera.Extensions;
using Althera.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace Althera.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class OrdersController : ControllerBase
{
    private readonly OrdersService _ordersService;

    public OrdersController(OrdersService ordersService)
    {
        _ordersService = ordersService;
    }

    [HttpGet]
    public ActionResult<List<OrderModel>> GetAllOrders([FromQuery] long patientId)
    {
        if (patientId > 0)
        {
            try
            {
                var orders = _ordersService.GetOrdersByPatientId(patientId).Select(order => order.ToApi()).ToList();

                return Ok(orders);
            }
            catch (ArgumentNullException argEx)
            {
                return BadRequest("Invalid argument: " + argEx.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server error: " + ex.Message);
            }
        }
        else
        {
            try 
            {
                var orders = _ordersService.GetAll().Select(order => order.ToApi()).ToList();
                return Ok(orders);
            }
            catch (ArgumentNullException argEx)
            {
                return BadRequest("Invalid argument: " + argEx.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server error: " + ex.Message);
            }
        }    
    }

    [HttpGet("{id}")]
    public ActionResult<OrderModel> GetOrder(long id)
    {
        try
        {
            var order = _ordersService.GetOrder(id);

            if (order == null)
            {
                return NotFound("No Orders Found");
            }

            return Ok(order.ToApi());
        }
        catch (ArgumentNullException argEx)
        {
            return BadRequest("Invalid argument: " + argEx.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal Server error: " + ex.Message);
        }
    }

    [HttpGet("ByPatient/{patientId}")]
public ActionResult<List<OrderModel>> GetOrdersByPatientId(long patientId)
{
    try
    {
        var orders = _ordersService.GetOrdersByPatientId(patientId).Select(order => order.ToApi()).ToList();

        return Ok(orders);
    }
    catch (ArgumentNullException argEx)
    {
        return BadRequest("Invalid argument: " + argEx.Message);
    }
    catch (Exception ex)
    {
        return StatusCode(500, "Internal Server error: " + ex.Message);
    }
}

    [HttpPost]
    public ActionResult<OrderModel> CreateOrder(OrderCreateRequest orderCreateRequest)
    {
        try
        {
            if (orderCreateRequest == null)
            {
                return BadRequest();
            }

            var order = _ordersService.CreateOrder(orderCreateRequest);

            return StatusCode(201, order.ToApi());
        }
        catch (ArgumentNullException argEx)
        {
            return BadRequest("Invalid argument: " + argEx.Message);
        }
        catch (InvalidOperationException invOpEx)
        {
            return StatusCode(404, invOpEx.Message);
        }
        catch (Exception ex)
        {
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
                return NotFound("Order Not Found");
            }

            var order = _ordersService.UpdateOrder(id, orderUpdateRequest);

            if (order == null)
            {
                return BadRequest();
            }

            return Ok(order.ToApi());
        }
        catch (ArgumentNullException argEx)
        {
            return BadRequest("Invalid argument: " + argEx.Message);
        }
        catch (InvalidOperationException invOpEx)
        {
            return StatusCode(404, invOpEx.Message);
        }
        catch (Exception ex)
        {
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

            return NoContent();
        }
        catch (ArgumentNullException argEx)
        {
            return BadRequest("Invalid argument: " + argEx.Message);
        }
        catch (InvalidOperationException invOpEx)
        {
            return StatusCode(400, "Invalid operation: " + invOpEx.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal Server error: " + ex.Message);
        }
    }
}
