using Althera.Models;
using Althera.Services;
using Microsoft.AspNetCore.Mvc;

namespace Althera.Controllers;

[ApiController]
[Route("[controller]")]
public class ClinicsController : ControllerBase {
     private readonly ClinicsService _clinicsService;

    public ClinicsController(ClinicsService clinicServices){
        _clinicsService = clinicServices;
    }

    // GET all action
    [HttpGet]
    public ActionResult<List<ClinicModel>> GetAllClinics(){
        return _clinicsService.GetAllClinics();
        
    }

    // GET by Id action
    [HttpGet("{id}")]
    public ActionResult<ClinicModel> GetClinics(int id){
        var order = _clinicsService.GetCliniqueById(id);
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
        _clinicsService.CreateClinic(clinic);
        return StatusCode(201, clinic);
    }


    // PUT action (Modification/Edit)
    [HttpPut("{id}")]
    public IActionResult UpdateClinic(int id, ClinicModel clinic){
        _clinicsService.UpdateClinic(id, clinic);
        return NoContent();
    }


    // DELETE action
    [HttpDelete("{id}")]
    public IActionResult DeleteClinic(int id){
        _clinicsService.DeleteClinic(id);
        return NoContent();
    }

}