using System.ComponentModel.DataAnnotations;
namespace Althera.Api.Requests;
public record PatientCreateRequest
{
    [Required(ErrorMessage = "Patient first name is required.")]
    [StringLength(100, ErrorMessage = "Patient first name cannot exceed 100 characters.")]
    public required string FirstName { get; init; }

    [Required(ErrorMessage = "Patient last name is required.")]
    [StringLength(100, ErrorMessage = "Patient last name cannot exceed 100 characters.")]
    public required string LastName { get; init; }

    [Required(ErrorMessage = "Patient HIN is required.")]
    [StringLength(100, ErrorMessage = "Patient HIN cannot exceed 100 characters.")]
    public string? HealthInsuranceNumber { get; init; }

    [Required(ErrorMessage = "Patient clinic ID is required.")]
    public long ClinicId { get; init; }
}
