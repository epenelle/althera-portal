using System.ComponentModel.DataAnnotations;

namespace Althera.Api.Requests;

public record OrderCreateRequest
{
    [StringLength(100, ErrorMessage = "Orthesis information cannot exceed 100 characters.")]
    [Required(ErrorMessage = "Orthesis info is required.")]
    public string? OrthesisInfo { get; set; }

    [StringLength(200, ErrorMessage = "Orthesis comment cannot exceed 200 characters.")]
    [Required(ErrorMessage = "Orthesis comment is required.")]
    public string? OrthesisComment { get; set; }

    [StringLength(100, ErrorMessage = "Orthesis model cannot exceed 100 characters.")]
    [Required(ErrorMessage = "Orthesis model is required.")]
    public string? OrthesisModel { get; set; }

    [Required(ErrorMessage = "Orthesis scan is required.")]
    public string? OrthesisScan { get; set; }

    [Required(ErrorMessage = "Patient ID is required.")]
    public required long PatientId { get; set; }
}