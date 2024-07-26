using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public record PatientDB {
    [Key]
    public int patientId {get; set;}
    public string? patientFirstname { get; set; }
    public string? patientLastname { get; set; }
    public int? healthInsuranceCard { get; set; }

    [ForeignKey("clinicId")]
    public int clinicId { get; set; }
    
    // Propriété de navigation
    public ClinicDB? Clinic { get; set; }

    // Propriété de navigation inverse
    public ICollection<OrderDB>? Orders { get; set; }
}
