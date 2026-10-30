namespace Portal.Services;

public record BlobUploadSasResult(string UploadUrl, string BlobUrl, string BlobName);

public interface IBlobStorageService
{
    Task<BlobUploadSasResult> GetUploadSasUrlAsync(string? fileExtension);
}
