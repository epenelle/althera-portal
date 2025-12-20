using Portal.Dto;
using Portal.Models;
using Portal.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace azure_functions;

public class PatientsController
{
    private readonly JsonSerializerOptions _jsonSerializerOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        Converters = { new JsonStringEnumConverter(JsonNamingPolicy.SnakeCaseLower) },
    };
    private readonly IPatientService _patientService;
    private readonly ILogger<PatientsController> _logger;

    public PatientsController(IPatientService patientService, ILogger<PatientsController> logger)
    {
        _logger = logger;
        _patientService = patientService;
    }

    [Function("create-patient")]
    public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Function, "post", Route = "patients")] HttpRequest req, CancellationToken ct)
    {
        try
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync(ct);
            
            if (string.IsNullOrEmpty(requestBody))
            {
                return new BadRequestObjectResult("Request body is required");
            }

            PatientCreateRequest? patientCreateRequest = JsonSerializer.Deserialize<PatientCreateRequest>(requestBody, _jsonSerializerOptions);
            
            if (patientCreateRequest is null)
            {
                return new BadRequestObjectResult("Invalid patient data");
            }
            
            var validationResults = new List<ValidationResult>();
            if (!Validator.TryValidateObject(patientCreateRequest, new ValidationContext(patientCreateRequest), validationResults, true))
            {
                var errors = validationResults
                    .Select(vr => vr.ErrorMessage)
                    .ToList();
                    
                return new BadRequestObjectResult(new { 
                    message = "Validation failed",
                    errors
                });
            }
            
            var createdPatient = await _patientService.CreatePatientAsync(patientCreateRequest, ct);
            
            return new CreatedResult($"/api/patients/{createdPatient.Id}", createdPatient);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating patient");
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }
    }

    [Function("get-patient")]
    public async Task<IActionResult> GetPatient([HttpTrigger(AuthorizationLevel.Function, "get", Route = "patients/{id}")] HttpRequest req, string id, CancellationToken ct)
    {
        try
        {
            if(string.IsNullOrEmpty(id))
            {
                return new BadRequestObjectResult("Patient ID is required");
            }

            if (!Guid.TryParse(id, out Guid id_))
            {
                return new BadRequestObjectResult("Invalid Patient ID format");
            }

            Patient? patient = await _patientService.GetPatientAsync(id_, ct);
            return patient is null ? new NotFoundResult() : new OkObjectResult(patient);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving patients");
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }
    }

    [Function("get-patients")]
    public async Task<IActionResult> GetPatients([HttpTrigger(AuthorizationLevel.Function, "get", Route = "patients")] HttpRequest req, CancellationToken ct)
    {
        try
        {
            List<Patient> patients = await _patientService.GetPatientsAsync(ct);
            return new OkObjectResult(patients);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving patients");
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }
    }
}