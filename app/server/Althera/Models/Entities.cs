using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


// replace Class => Record
public record ClinicDB {
    [Key]
    public int clinicId { get; set; }
    public string? clinicName { get; set; }
    public string? clinicPassword { get; set; }
    public string? clinicAddress { get; set; }

    // Reverse navigation property
    public ICollection<PatientDB>? Patients { get; set; }

//    public List<Patient> Patients { get; } = new();
}

public class PatientDB {
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

public class OrderDB {
    [Key]
    public int orderId { get; set; }
    public string? orthesisModel { get; set; }
    public string? orthesisInfo { get; set; }
    public string? orthesisScan { get; set; }
    public DateTime? orderDate { get; set; }
    public string? orderState { get; set; }
    public string? orthesisComment { get; set; }

    [ForeignKey("patientId")]
    public int patientId { get; set; }

    // Navigation property
    public PatientDB? Patient { get; set; }
}