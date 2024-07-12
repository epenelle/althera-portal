using Althera.Models;

namespace Althera.Services;

public static class CommandeService{

    static List<Commande> Commande {get;}
    static int nextId = 3;

    static CommandeService(){
        Commandes = new List<Commade> {
            new Commande { Id = 1, IdPatient = 2, dateCommande = "10/07/2024"},
            new Commande { Id = 2, IdPatient = 1, dateCommande = "10/07/2024"}
        };
    }

    public static List<Commande> GetAll() => Commandes;

    public static Commande? Get(int id) => Commandes.FirstOrDefault(p => p.Id == id);

    public static void Add(Commande commande){
        commande.Id = nextId++;
        Commandes.Add(commande);
    }

    public static void Delete(int id){
        var commandeId = Get(id);
        if(commandeId is null){
            return;
        }
        Commandes.Remove(commandeId);
    }


    public static void Update(Commande commande){
        var index = Commandes.FindIndex(commande => commande.Id == commande.Id);
        if(index == -1){
            return;
        }
        Commandes[index] = commande;
    }
}