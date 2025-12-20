using System.ComponentModel.DataAnnotations;

namespace Portal.Dto;

public class OrderCreateRequest
{
    [Required]
    public string PatientId { get; init; } = string.Empty;
        
    [Required]
    public string Limb { get; init; } = string.Empty;

    public string? Side { get; init; }

    [Required]
    public string OrthoseModelId { get; init; } = string.Empty;

    public Dictionary<string, string> Measurements { get; init; } = [];

    public string? ScanId { get; init; }
}