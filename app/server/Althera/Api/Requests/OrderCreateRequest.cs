namespace Althera.Api.Requests;
public record OrderCreateRequest
{
    public string? OrthesisInfo { get; set; }
    public string? OrthesisComment { get; set; }
    public string? OrthesisModel { get; set; }
    public string? OrthesisScan { get; set; }
    public required long PatientId { get; set; }
}
