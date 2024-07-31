using Althera.Api.Models;
using Althera.Api.Requests;
using Althera.Extensions;
using Althera.Services;
using Microsoft.AspNetCore.Mvc;

namespace Althera.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class PatientsController(PatientsService patientServices) : ControllerBase
{
    private readonly PatientsService _patientsService = patientServices;

    [HttpGet]
    public ActionResult<List<PatientModel>> GetAllPatients()
    {
        try{
            var patients = _patientsService.GetAll().Select(patient => patient.ToApi()).ToList();

            if(patients == null){
                return NotFound("No Patients Found");
            }

            // Same as Return 200
            return Ok(patients);
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
    public ActionResult<PatientModel> GetPatient(long id)
    {
        try {
            var patient = _patientsService.GetPatient(id);

            if (patient == null)
            {
                return NotFound("No Patient Found");
            }

            // Same as Return 200
            return Ok(patient.ToApi());
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
    public ActionResult<PatientModel> CreatePatient(PatientCreateRequest patientCreateRequest)
    {
        try {
            if (patientCreateRequest == null) {
                return BadRequest();
            }

            var patient = _patientsService.CreatePatient(patientCreateRequest);
            
            if(patient == null){
                return StatusCode(500, "Error Server");
            }
            
            // Return code 201 => Create Successfull
            return StatusCode(201, patient.ToApi());
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
    public ActionResult UpdatePatient(long id, PatientUpdateRequest patientUpdateRequest)
    {
        try
        {
            if(patientUpdateRequest == null){
                return BadRequest();
            }

            var patientById = _patientsService.GetPatient(id);
             
            if(patientById == null ){
                return NotFound("Patient Not Found");
            }
           
            var patient = _patientsService.UpdatePatient(id, patientUpdateRequest);
           
            if(patient == null){
                return BadRequest();
            }

            return Ok(patient.ToApi());
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
    public IActionResult DeletePatient(long id)
    {
       try
        {
            var patient = _patientsService.GetPatient(id);

            if (patient == null)
            {
                return NotFound("Patient Not Found");
            }

            _patientsService.DeletePatient(id);

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