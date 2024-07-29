using Althera.Api.Models;
using Althera.Api.Requests;
using Althera.Extensions;
using Althera.Services;
using Microsoft.AspNetCore.Mvc;

namespace Althera.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class ClinicsController(ClinicsService clinicServices) : ControllerBase
{
    private readonly ClinicsService _clinicsService = clinicServices;

    [HttpGet]
    public ActionResult<List<ClinicModel>> GetAllClinics()
    {
        return _clinicsService.GetAll().Select(clinic => clinic.ToApi()).ToList();
    }

    [HttpGet("{id}")]
    public ActionResult<ClinicModel> GetClinic(string id)
    {
        var clinic = _clinicsService.GetClinic(id);

        return clinic == null ? NotFound() : clinic.ToApi();
    }

    [HttpPost]
    public ActionResult<ClinicModel> CreateClinic(ClinicCreateRequest clinicCreateRequest)
    {
        if (clinicCreateRequest == null)
        {
            return BadRequest();
        }

        var clinic = _clinicsService.CreateClinic(clinicCreateRequest);
        return StatusCode(201, clinic.ToApi());
    }

    [HttpPut("{id}")]
    public ActionResult<ClinicModel> UpdateClinic(string id, ClinicUpdateRequest clinicUpdateRequest)
    {
        var clinic = _clinicsService.UpdateClinic(id, clinicUpdateRequest);
        return StatusCode(200, clinic.ToApi());
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteClinic(string id)
    {
        _clinicsService.DeleteClinic(id);
        return NoContent();
    }
}