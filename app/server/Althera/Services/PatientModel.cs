namespace Althera.Services;

public record PatientModel {
    public string? patientFirstname { get; set; }
    public string? patientLastname { get; set; }
    public int? healthInsuranceCard { get; set; }

    // Clé étrangère
    public int clinicId { get; set; }
}
