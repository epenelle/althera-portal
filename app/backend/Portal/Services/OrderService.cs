using Portal.Domain;
using Portal.Dto;
using Portal.Models;
using Portal.Persistence.Models;
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

    public async Task<List<OrderResponse>> GetOrdersAsync(CancellationToken cancellationToken)
    {
        List<OrderModel> orderModels = await _orderRepository.GetAllAsync(cancellationToken);
        List<Patient> patients = await _patientService.GetPatientsAsync(cancellationToken);

        Dictionary<Guid, Patient> patientMap = patients.ToDictionary(p => p.Id);

        return [.. orderModels.Select(o =>
        {
            patientMap.TryGetValue(o.PatientId, out Patient? patient);
            return new OrderResponse
            {
                Id = o.OrderId,
                Patient = new PatientSummary
                {
                    PatientId = o.PatientId,
                    FirstName = patient?.FirstName ?? string.Empty,
                    LastName = patient?.LastName ?? string.Empty,
                },
                Orthosis = new OrthosisDetails
                {
                    Limb = o.Limb,
                    Side = o.Side,
                    ModelId = o.OrthoseModelId,
                    Measurements = o.Measurements,
                },
                ScanId = o.ScanId,
                Status = o.Status,
                CreatedAt = o.CreatedAt,
                UpdatedAt = o.UpdatedAt,
            };
        })];
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
            Status = OrderStatus.InProgress,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
        };

        await _orderRepository.CreateAsync(order, cancellationToken);

        return order;
    }
}