namespace Althera.Api.Models;
public record OrderModel
{
    public required string Id { get; init; }
    public string? OrthesisModel { get; set; }
    public string? OrthesisInfo { get; set; }
    public string? OrthesisScan { get; set; }
    public DateTime? OrderDate { get; set; }
    public string? OrderState { get; set; }
    public string? OrthesisComment { get; set; }
    public string? PatientId { get; set; }
}
