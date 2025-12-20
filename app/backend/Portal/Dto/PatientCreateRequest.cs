using System.ComponentModel.DataAnnotations;

namespace Portal.Dto;

public class PatientCreateRequest
{
    [Required]
    public string FirstName { get; init; } = string.Empty;
    
    [Required]
    public string LastName { get; set; } = string.Empty;
        
    public string? Email { get; set; }
    public string? Phone { get; set; }
}