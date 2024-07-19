using System;

using var db = new AppDbContext();

Console.WriteLine($"Database path: {db.DbPath}.");

// Create 
Console.WriteLine("inserting new Clinique");
db.Add(new Clinique {nomClinique = "nomclinique1", password = "passwordClinique1", address = "addressClinique1"});
db.SaveChanges();

Console.WriteLine("inserting new patient");
db.Add(new Patient {nomPatient = "nompatient", prenomPatient = "prenomPatient", numeroAssuranceMaladie = 123, CliniqueId=4});
db.SaveChanges();

Console.WriteLine("inserting new Commande");
db.Add(new Commande {modelorthese = "modelOrthese1", infoOrthese = "infoOrthese1", scan = "Scan1", date= DateTime.Now, etatCommande="etatCommande1", commentaireOrthese="commentaireOrthese1", PatientId=4});
db.SaveChanges();



// Read
Console.WriteLine("Get a clinique");
var cliniqueGet = db.Cliniques.Single(b => b.cliniqueId == 2);
Console.WriteLine("The Clinique : "+ cliniqueGet.nomClinique);

Console.WriteLine("Get a Commande");
var commandeGet = db.Commandes.Single(c => c.commandeId == 1);
Console.WriteLine("The Commande id : "+ commandeGet.commandeId);
Console.WriteLine("The Commande Model : "+ commandeGet.modelorthese);
Console.WriteLine("The Commande Info Orthèse : "+ commandeGet.infoOrthese);
Console.WriteLine("The Commande date : "+ commandeGet.date);

//Update
Console.WriteLine("Update clinique");
var cliniqueUpdate = db.Cliniques.Single(b => b.cliniqueId == 2);
Console.WriteLine("The Clinique befor update : "+ cliniqueUpdate.nomClinique);

cliniqueUpdate.nomClinique = "clinique After update";
Console.WriteLine("The Clinique After update : "+ cliniqueUpdate.nomClinique);

db.SaveChanges();

// Delete
//Console.WriteLine("Delete clinique");
//db.Remove(clinique);
//db.SaveChanges();