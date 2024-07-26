using System.ComponentModel.DataAnnotations;
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
