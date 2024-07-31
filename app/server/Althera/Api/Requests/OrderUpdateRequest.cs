namespace Althera.Api.Requests;
public record OrderUpdateRequest
{
    public string? OrthesisInfo { get; set; }
    public string? OrthesisComment { get; set; }
    public long? PatientId { get; set; }
}
