using Althera.Models.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Althera.Persistence;

public class AppDbContext : DbContext
{
    public DbSet<ClinicEntity> Clinics { get; set; }
    public DbSet<PatientEntity> Patients { get; set; }
    public DbSet<OrderEntity> Orders { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=MyDatabase;Trusted_Connection=True;");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        // Primary Key
        modelBuilder.Entity<ClinicEntity>()
            .HasKey(c => c.Id);
        modelBuilder.Entity<PatientEntity>()
            .HasKey(k => k.Id);
        modelBuilder.Entity<OrderEntity>()
            .HasKey(k => k.Id);

        // Foreign Key
        modelBuilder.Entity<PatientEntity>()
            .HasOne(p => p.Clinic)
            .WithMany(c => c.Patients)
            .HasForeignKey(p => p.ClinicId);
        
        // Foreign Key
        modelBuilder.Entity<OrderEntity>()
            .HasOne(o => o.Patient)
            .WithMany(p => p.Orders)
            .HasForeignKey(o => o.PatientId);
    }
}

