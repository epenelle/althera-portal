using System.ComponentModel.DataAnnotations;
namespace Althera.Api.Requests;
public record ClinicUpdateRequest
{
    [StringLength(100, ErrorMessage = "Clinic name cannot exceed 100 characters.")]
    [MinLength(1, ErrorMessage = "Clinic name connot be empty.")]
    public string? Name { get; init; }
}
