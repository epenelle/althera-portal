using Althera.Models.Api.Clinic;
using Althera.Services;
using Microsoft.AspNetCore.Mvc;

namespace Althera.Controllers;

[ApiController]
[Route("[controller]")]
public class ClinicsController : ControllerBase
{
    private readonly ClinicsService _clinicsService;

    public ClinicsController(ClinicsService clinicServices)
    {
        _clinicsService = clinicServices;
    }

    [HttpGet]
    public ActionResult<List<ClinicModel>> GetAllClinics()
    {
        return _clinicsService.GetAllClinics();
    }

    [HttpGet("{id}")]
    public ActionResult<ClinicModel> GetClinics(int id)
    {
        var order = _clinicsService.GetCliniqueById(id);

        return order == null ? NotFound() : order;
    }

    [HttpPost]
    public IActionResult CreateClinic(ClinicModel clinic)
    {
        if (clinic == null)
        {
            return BadRequest();
        }

        _clinicsService.CreateClinic(clinic);
        return StatusCode(201, clinic);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateClinic(int id, ClinicModel clinic)
    {
        _clinicsService.UpdateClinic(id, clinic);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteClinic(int id)
    {
        _clinicsService.DeleteClinic(id);
        return NoContent();
    }
}