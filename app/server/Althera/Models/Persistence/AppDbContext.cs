using Microsoft.EntityFrameworkCore;

namespace Althera.Models.Persistence;

public class AppDbContext : DbContext
{
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
            .HasKey(c => c.Id);
        modelBuilder.Entity<PatientDB>()
            .HasKey(k => k.Id);
        modelBuilder.Entity<OrderDB>()
            .HasKey(k => k.Id);

        modelBuilder.Entity<PatientDB>()
            .HasOne(p => p.Clinic)
            .WithMany(c => c.Patients)
            .HasForeignKey(p => p.ClinicId);

        modelBuilder.Entity<OrderDB>()
            .HasOne(c => c.Patient)
            .WithMany(p => p.Orders)
            .HasForeignKey(c => c.Patient);
    }
}

