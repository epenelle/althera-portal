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
        try
        {
            var clinics = _clinicsService.GetAll().Select(clinic => clinic.ToApi()).ToList();

            if (clinics == null)
            {
                return NotFound("No Clinic Found");
            }

            // Same as Return 200
            return Ok(clinics);
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
    public ActionResult<ClinicModel> GetClinic(string id)
    {
        try
        {
            var clinic = _clinicsService.GetClinic(id);

            if (clinic == null)
            {
                return NotFound("No Clinic Found");
            }

            // Same as Return 200
            return Ok(clinic.ToApi());
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
    public ActionResult<ClinicModel> CreateClinic(ClinicCreateRequest clinicCreateRequest)
    {
        try
        {            
            if (clinicCreateRequest == null)
            {
                return BadRequest();
            }

            var clinic = _clinicsService.CreateClinic(clinicCreateRequest);

            if (clinic == null)
            {
                return StatusCode(500, "Error Server");
            }

            // Return code 201 => Create Successsfull
            return StatusCode(201, clinic.ToApi());
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

    [HttpPut("{id}")]
    public ActionResult<ClinicModel> UpdateClinic(string id, ClinicUpdateRequest clinicUpdateRequest)
    {
        try
        {

            if (clinicUpdateRequest == null)
            {
                return BadRequest();
            }
            
            var clinicById = _clinicsService.GetClinic(id);
            
            if (clinicById == null)
            {
                return NotFound("Clinic Not Found");
            }

            var clinic = _clinicsService.UpdateClinic(id, clinicUpdateRequest);

            if (clinic == null)
            {
                return BadRequest();
            }
            
            // Same as Return 200
            return Ok(clinic.ToApi());
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
    public IActionResult DeleteClinic(string id)
    {
        try
        {
            var clinic = _clinicsService.GetClinic(id);

            if (clinic == null)
            {
                return NotFound("Clinic Not Found");
            }

            _clinicsService.DeleteClinic(id);

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