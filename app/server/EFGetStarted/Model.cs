using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;


public class AppDbContext : DbContext {

    public DbSet<Clinic> Clinics { get; set; }
    public DbSet<Patient> Patients { get; set; }
    public DbSet<Order> Orders { get; set; }

    public string? DbPath { get; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=MyDatabase;Trusted_Connection=True;");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Patient>()
            .HasOne(p => p.Clinic)
            .WithMany(c => c.Patients)
            .HasForeignKey(p => p.clinicId);

        modelBuilder.Entity<Order>()
            .HasOne(c => c.Patient)
            .WithMany(p => p.Orders)
            .HasForeignKey(c => c.patientId);
    }


}


public class Clinic {
    public int clinicId { get; set; }
    public string? clinicName { get; set; }
    public string? clinicPassword { get; set; }
    public string? clinicAddress { get; set; }

    // Propriété de navigation inverse
    public ICollection<Patient>? Patients { get; set; }

}

public class Patient {
    public int patientId {get; set;}
    public string? firstNamePatient { get; set; }
    public string? lastNamePatient { get; set; }
    public int? healthInsuranceCard { get; set; }

    // Clé étrangère
    public int clinicId { get; set; }
    
    // Propriété de navigation
    public Clinic? Clinic { get; set; }

    // Propriété de navigation inverse
    public ICollection<Order>? Orders { get; set; }
}

public class Order {
    public int orderId { get; set; }
    public string? orthesisModel { get; set; }
    public string? orthesisInfo { get; set; }
    public string? orthesisScan { get; set; }
    public DateTime? orderDate { get; set; }
    public string? orderState { get; set; }
    public string? orthesisComment { get; set; }

    //Foreign key
    public int patientId { get; set; }

    // Navigation property
    public Patient? Patients { get; set; }
}

