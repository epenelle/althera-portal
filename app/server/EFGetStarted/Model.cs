using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;


public class AppDbContext : DbContext {

    public DbSet<Clinique> Cliniques { get; set; }
    public DbSet<Patient> Patients { get; set; }

    public string? DbPath { get; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=MyDatabase;Trusted_Connection=True;");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Patient>()
            .HasOne(p => p.Clinique)
            .WithMany(c => c.Patients)
            .HasForeignKey(p => p.CliniqueId);
    }


}


public class Clinique {
    public int cliniqueId { get; set; }
    public string? nomClinique { get; set; }
    public string? password { get; set; }
    public string? address { get; set; }

    // Propriété de navigation inverse
    public ICollection<Patient>? Patients { get; set; }

//    public List<Patient> Patients { get; } = new();

}

public class Patient {
    public int patientId {get; set;}
    public string? nomPatient { get; set; }
    public string? prenomPatient { get; set; }
    public int? numeroAssuranceMaladie { get; set; }

    // Clé étrangère
    public int CliniqueId { get; set; }
    
    // Propriété de navigation
    public Clinique? Clinique { get; set; }
}