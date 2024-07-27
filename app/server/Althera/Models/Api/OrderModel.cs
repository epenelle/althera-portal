namespace Althera.Models.Api;
public record OrderModel
{
    public string? OrthesisModel { get; set; }
    public string? OrthesisInfo { get; set; }
    public string? OrthesisScan { get; set; }
    public DateTime? OrderDate { get; set; }
    public string? OrderState { get; set; }
    public string? OrthesisComment { get; set; }
    public int PatientId { get; set; }
}
