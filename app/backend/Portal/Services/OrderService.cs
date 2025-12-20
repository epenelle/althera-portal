using Portal.Domain;
using Portal.Dto;
using Portal.Models;
using Portal.Repositories;

namespace Portal.Services;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepository;
    private readonly IPatientService _patientService;

    public OrderService(IOrderRepository orderRepository, IPatientService patientService)
    {
        _orderRepository = orderRepository;
        _patientService = patientService;
    }

    public async Task<Order> CreateOrderAsync(OrderCreateRequest orderCreateRequest, CancellationToken cancellationToken)
    {
        if(!Guid.TryParse(orderCreateRequest.PatientId, out var patientId))
        {
            throw new ArgumentException($"Invalid Patient ID: {orderCreateRequest.PatientId}");
        }

        if(!Enum.TryParse<LimbSide>(orderCreateRequest.Side, ignoreCase: true, out var limbSide))
        {
            throw new ArgumentException($"Invalid Side: {orderCreateRequest.Side}");
        }

        Patient? patient = await _patientService.GetPatientAsync(patientId, cancellationToken);
        if (patient == null)
        {
            throw new ArgumentException($"Patient with ID {orderCreateRequest.PatientId} not found.");
        }

        // TODO : If there is a scanId, check if the scan exists

        var order = new Order
        {
            Id = Guid.NewGuid(),
            PatientId = patientId,
            Limb = orderCreateRequest.Limb,
            Side = limbSide,
            OrthoseModelId = orderCreateRequest.OrthoseModelId,
            Measurements = orderCreateRequest.Measurements,
            ScanId = orderCreateRequest.ScanId,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
        };

        await _orderRepository.CreateAsync(order, cancellationToken);

        return order;
    }
}