using Althera.Models;
using Althera.Services;
using Microsoft.AspNetCore.Mvc;

namespace Althera.Controllers;

[ApiController]
[Route("[controller]")]
public class PatientController : ControllerBase {
    public PatientController(){

    }

    // GET all action
    [HttpGet]
    public ActionResult<List<Patient>> GetAll() => PatientService.GetAll();

    // GET by Id action
    [HttpGet("{id}")]
    public ActionResult<Patient> Get(int id){
        var patient = PatientService.Get(id);
        if(patient == null){
            return NotFound();
        }
        return patient;
    }

    // POST action
    [HttpPost]
    public IActionResult Create(Patient patient){
        PatientService.Add(patient);
        return CreatedAtAction(nameof(Get), new {id= patient.Id}, patient);
    }


    // PUT action (Modification/Edit)
    [HttpPut("{id}")]
    public IActionResult Update(int id, Patient patient){
        if(id != patient.Id){
            return BadRequest();
        }
        
        var existingPatient = PatientService.Get(id);
        if(existingPatient is null){
            return NotFound();
        }

        PatientService.Update(patient);
        return NoContent();
    }


    // DELETE action
    [HttpDelete("{id}")]
    public IActionResult Delete(int id){

        var patient = PatientService.Get(id);

        if(patient is null){
            return NotFound();
        }

        PatientService.Delete(id);
        return NoContent();
    }

}