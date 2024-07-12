using Althera.Models;
using Althera.Services;
using Microsoft.AspNetCore.Mvc;

namespace Althera.Controllers;

[ApiController]
[Route("[controller]")]
public class CommandeController : ControllerBase {
    public CommandeController(){

    }

    // GET all action
    [HttpGet]
    public ActionResult<List<Commande>> GetAll() => CommandeService.GetAll();

    // GET by Id action
    [HttpGet("{id}")]
    public ActionResult<Commande> Get(int id){
        var commande = CommandeService.Get(id);
        if(commande == null){
            return NotFound();
        }
        return commande;
    }

    // POST action
    [HttpPost]
    public IActionResult Create(Commande commande){
        CommandeService.Add(commande);
        return CreatedAtAction(nameof(Get), new {id= commande.Id}, commande);
    }


    // PUT action (Modification/Edit)
    [HttpPut("{id}")]
    public IActionResult Update(int id, Commande commande){
        if(id != commande.Id){
            return BadRequest();
        }
        
        var existingCommande = CommandeService.Get(id);
        if(existingCommande is null){
            return NotFound();
        }

        CommandeService.Update(commande);
        return NoContent();
    }


    // DELETE action
    [HttpDelete("{id}")]
    public IActionResult Delete(int id){

        var commande = CommandeService.Get(id);

        if(commande is null){
            return NotFound();
        }

        CommandeService.Delete(id);
        return NoContent();
    }

}