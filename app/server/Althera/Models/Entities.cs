public class ClinicDB {
    public int clinicId { get; set; }
    public string? clinicName { get; set; }
    public string? clinicPassword { get; set; }
    public string? clinicAddress { get; set; }

    // Reverse navigation property
    public ICollection<PatientDB>? Patients { get; set; }

//    public List<Patient> Patients { get; } = new();
}

public class PatientDB {
    public int patientId {get; set;}
    public string? patientFirstname { get; set; }
    public string? patientLastname { get; set; }
    public int? healthInsuranceCard { get; set; }

    // Clé étrangère
    public int clinicId { get; set; }
    
    // Propriété de navigation
    public ClinicDB? Clinic { get; set; }

    // Propriété de navigation inverse
    public ICollection<OrderDB>? Orders { get; set; }
}

public class OrderDB {
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
    public PatientDB? Patient { get; set; }
}