using Althera.Models;
using Althera.Services;
using Microsoft.AspNetCore.Mvc;

namespace Althera.Controllers;

[ApiController]
[Route("[controller]")]
public class ClinicController : ControllerBase {
     private readonly ClinicServices _clinicServices;

    public ClinicController(ClinicServices clinicServices){
        _clinicServices = clinicServices;
    }

    // GET all action
    [HttpGet]
    public ActionResult<List<ClinicModel>> GetAllClinics(){
        return _clinicServices.GetAllClinics();
        
    }

    // GET by Id action
    [HttpGet("{id}")]
    public ActionResult<ClinicModel> GetClinics(int id){
        var order = _clinicServices.GetCliniqueById(id);
        if(order == null){
            return NotFound();
        }
        return order;
    }

    // POST action
    [HttpPost]
    public IActionResult CreateClinic(ClinicModel clinic){
        if(clinic == null){
            return BadRequest();
        }
        _clinicServices.CreateClinic(clinic);
        return StatusCode(201, clinic);
    }


    // PUT action (Modification/Edit)
    [HttpPut("{id}")]
    public IActionResult UpdateClinic(int id, ClinicModel clinic){
        _clinicServices.UpdateClinic(id, clinic);
        return NoContent();
    }


    // DELETE action
    [HttpDelete("{id}")]
    public IActionResult DeleteClinic(int id){
        _clinicServices.DeleteClinic(id);
        return NoContent();
    }

}