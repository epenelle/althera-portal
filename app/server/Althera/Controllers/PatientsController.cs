using Althera.Models.Api;
using Althera.Services;
using Microsoft.AspNetCore.Mvc;

namespace Althera.Controllers;

[ApiController]
[Route("[controller]")]
public class PatientsController : ControllerBase
{
    private readonly PatientsService _patientsService;

    public PatientsController(PatientsService patientServices)
    {
        _patientsService = patientServices;
    }

    [HttpGet]
    public ActionResult<List<PatientModel>> GetAllPatients()
    {
        return _patientsService.GetAllPatients();
    }

    [HttpGet("{id}")]
    public ActionResult<PatientModel> GetPatient(int id)
    {
        var patient = _patientsService.GetPatientById(id);
        if (patient == null)
        {
            return NotFound();
        }

        return patient;
    }

    [HttpPost]
    public IActionResult CreatePatient(PatientModel patient)
    {
        if (patient == null)
        {
            return BadRequest();
        }

        _patientsService.CreatePatient(patient);
        return StatusCode(201, patient);
    }

    [HttpPut("{id}")]
    public IActionResult UpdatePatient(int id, PatientModel patient)
    {
        _patientsService.UpdatePatient(id, patient);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeletePatient(int id)
    {
        _patientsService.DeletePatient(id);
        return NoContent();
    }
}