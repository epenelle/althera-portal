using System.ComponentModel.DataAnnotations;
namespace Althera.Api.Requests;
public record OrderUpdateRequest
{
    [StringLength(100, ErrorMessage = "Orthesis information cannot exceed 100 characters.")]
    [MinLength(1, ErrorMessage = "Orthesis information cannot be empty.")]
    public string? OrthesisInfo { get; set; }
    
    [StringLength(200, ErrorMessage = "Orthesis comment cannot exceed 200 characters.")]
    [MinLength(1, ErrorMessage = "Orthesis comment cannot be empty.")]
    public string? OrthesisComment { get; set; }
    
    [Required(ErrorMessage = "Patient ID is required.")]
    public required long PatientId { get; set; }
}
