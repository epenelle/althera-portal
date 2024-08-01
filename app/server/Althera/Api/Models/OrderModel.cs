using System.ComponentModel.DataAnnotations;
namespace Althera.Api.Models;

public record OrderModel
{
    public required long Id { get; init; }
    public string? OrthesisModel { get; set; }
    public string? OrthesisInfo { get; set; }
    public string? OrthesisScan { get; set; }
    public DateTime? OrderDate { get; set; }
    public string? OrderState { get; set; }
    public string? OrthesisComment { get; set; }
    public required PatientModel Patient { get; init; }
}
