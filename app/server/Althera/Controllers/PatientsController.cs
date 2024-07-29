using Althera.Extensions;
using Althera.Models.Api.Patient;
using Althera.Requests;
using Althera.Services;
using Microsoft.AspNetCore.Mvc;

namespace Althera.Controllers;

[ApiController]
[Route("[controller]")]
public class PatientsController(PatientsService patientServices) : ControllerBase
{
    private readonly PatientsService _patientsService = patientServices;

    [HttpGet]
    public ActionResult<List<PatientModel>> GetAllPatients()
    {
        return _patientsService.GetAll().Select(patient => patient.ToApi()).ToList();
    }

    [HttpGet("{id}")]
    public ActionResult<PatientModel> GetPatient(string id)
    {
        var patient = _patientsService.GetPatient(id);

        if (patient == null)
        {
            return NotFound();
        }

        return patient.ToApi();
    }

    [HttpPost]
    public ActionResult<PatientModel> CreatePatient(PatientCreateRequest patientCreateRequest)
    {
        if (patientCreateRequest == null)
        {
            return BadRequest();
        }

        var patient = _patientsService.CreatePatient(patientCreateRequest);
        return StatusCode(201, patient.ToApi());
    }

    [HttpPut("{id}")]
    public ActionResult UpdatePatient(string id, PatientUpdateRequest patientUpdateRequest)
    {
        try
        {
            var patient = _patientsService.UpdatePatient(id, patientUpdateRequest);
            return StatusCode(200, patient.ToApi());
        }
        catch (InvalidOperationException)
        {
            return NotFound();
        }
    }

    [HttpDelete("{id}")]
    public IActionResult DeletePatient(string id)
    {
        try
        {
            _patientsService.DeletePatient(id);
            return NoContent();
        }
        catch (InvalidOperationException)
        {
            return NotFound();
        }
    }
}