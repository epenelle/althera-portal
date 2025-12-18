using System.ComponentModel.DataAnnotations;
namespace Althera.Api.Requests;
public record PatientUpdateRequest
{
    [StringLength(100, ErrorMessage = "Patient first name cannot exceed 100 characters.")]
    [MinLength(1, ErrorMessage = "Patient first name cannot be empty.")]
    public string? FirstName { get; init; }

    [StringLength(100, ErrorMessage = "Patient last name cannot exceed 100 characters.")]
    [MinLength(1, ErrorMessage = "Patient last name cannot be empty.")]
    public string? LastName { get; init; }

    [StringLength(100, ErrorMessage = "Patient HIN cannot exceed 100 characters.")]
    [MinLength(1, ErrorMessage = "Patient HIN cannot be empty.")]
    public string? HealthInsuranceNumber { get; init; }
}
