using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Portal.Dto;
using Portal.Services;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace azure_functions;

public class OrdersController
{
    private readonly JsonSerializerOptions _jsonSerializerOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        Converters = { new JsonStringEnumConverter(JsonNamingPolicy.SnakeCaseLower) },
    };
    private readonly IOrderService _orderService;
    private readonly ILogger<OrdersController> _logger;

    public OrdersController(IOrderService orderService, ILogger<OrdersController> logger)
    {
        _logger = logger;
        _orderService = orderService;
    }

    [Function("create-order")]
    public async Task<IActionResult> CreateOrder([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "orders")] HttpRequest req, CancellationToken ct)
    {
        try
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync(ct);
            
            if (string.IsNullOrEmpty(requestBody))
            {
                return new BadRequestObjectResult("Request body is required");
            }

            OrderCreateRequest? orderCreateRequest = JsonSerializer.Deserialize<OrderCreateRequest>(requestBody, _jsonSerializerOptions);
            
            if (orderCreateRequest is null)
            {
                return new BadRequestObjectResult("Invalid order data");
            }

            List<ValidationResult> validationResults = [];
            if (!Validator.TryValidateObject(orderCreateRequest, new ValidationContext(orderCreateRequest), validationResults, true))
            {
                var errors = validationResults
                    .Select(vr => vr.ErrorMessage)
                    .ToList();
                    
                return new BadRequestObjectResult(new { 
                    message = "Validation failed",
                    errors
                });
            }

            Order createdOrder = await _orderService.CreateOrderAsync(orderCreateRequest, ct);
            
            return new CreatedResult($"/api/orders/{createdOrder.Id}", createdOrder);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating order");
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }
    }
}