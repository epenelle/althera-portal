using System.ComponentModel.DataAnnotations;
namespace Althera.Api.Requests;
public record ClinicCreateRequest
{
    [Required(ErrorMessage = "Clinic name is required.")]
    [StringLength(100, ErrorMessage = "Clinic name cannot exceed 100 characters.")]
    public required string Name { get; init; }

    [Required(ErrorMessage = "Clinic address is required.")]
    [StringLength(100, ErrorMessage = "Clinic address cannot exceed 100 characters.")]
    public string? Street { get; init; }

    [Required(ErrorMessage = "Clinic city is required.")]
    [StringLength(100, ErrorMessage = "Clinic city cannot exceed 100 characters.")]
    public string? City { get; init; }

    [Required(ErrorMessage = "Clinic state is required.")]
    [StringLength(20, ErrorMessage = "Clinic ZIP cannot exceed 20 characters.")]
    public string? Zip { get; init; }
}
