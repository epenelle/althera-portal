using Althera.Models;
using Althera.Services;
using Microsoft.AspNetCore.Mvc;

namespace Althera.Controllers;

[ApiController]
[Route("[controller]")]
public class PatientController : ControllerBase {
     private readonly PatientServices _patientServices;

    public PatientController(PatientServices patientServices){
        _patientServices = patientServices;
    }

    // GET all action
    [HttpGet]
    public ActionResult<List<PatientModel>> GetAllPatients(){
        return _patientServices.GetAllPatients();
        
    }

    // GET by Id action
    [HttpGet("{id}")]
    public ActionResult<PatientModel> GetPatient(int id){
        var patient = _patientServices.GetPatientById(id);
        if(patient == null){
            return NotFound();
        }
        return patient;
    }

    // POST action
    [HttpPost]
    public IActionResult CreatePatient(PatientModel patient){
        if(patient == null){
            return BadRequest();
        }
        _patientServices.CreatePatient(patient);
        return NoContent();
    }


    // PUT action (Modification/Edit)
    [HttpPut("{id}")]
    public IActionResult UpdatePatient(int id, PatientModel patient){
        _patientServices.UpdatePatient(id, patient);
        return NoContent();
    }


    // DELETE action
    [HttpDelete("{id}")]
    public IActionResult DeletePatient(int id){
        _patientServices.DeletePatient(id);
        return NoContent();
    }

}