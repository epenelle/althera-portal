using Althera.Models.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace Althera.Models;

public class AppDbContext : DbContext {

    public DbSet<ClinicDB> Clinics { get; set; }
    public DbSet<PatientDB> Patients { get; set; }
    public DbSet<OrderDB> Orders { get; set; }

    public string? DbPath { get; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=MyDatabase;Trusted_Connection=True;");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        
        modelBuilder.Entity<ClinicDB>()
            .HasKey(c => c.clinicId);
        modelBuilder.Entity<PatientDB>()
            .HasKey(k => k.patientId);
        modelBuilder.Entity<OrderDB>()
            .HasKey(k => k.orderId);

        modelBuilder.Entity<PatientDB>()
            .HasOne(p => p.Clinic)
            .WithMany(c => c.Patients)
            .HasForeignKey(p => p.clinicId);

        modelBuilder.Entity<OrderDB>()
            .HasOne(c => c.Patient)
            .WithMany(p => p.Orders)
            .HasForeignKey(c => c.patientId);  

    }

}

