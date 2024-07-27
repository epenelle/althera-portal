namespace Althera.Models.Api;
public record PatientModel
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public int? HealthInsuranceNumber { get; set; }

    public int ClinicId { get; set; }
}
