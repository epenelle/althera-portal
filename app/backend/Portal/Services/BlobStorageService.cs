using Azure.Storage.Blobs;
using Azure.Storage.Sas;
using Microsoft.Extensions.Options;
using Portal.Options;

namespace Portal.Services;

public class BlobStorageService : IBlobStorageService
{
    private readonly AzureBlobStorageOptions _options;

    private static readonly HashSet<string> AllowedExtensions =
        new(StringComparer.OrdinalIgnoreCase) { ".stl", ".obj" };

    public BlobStorageService(IOptions<AzureBlobStorageOptions> options)
    {
        _options = options.Value;
    }

    // TODO: we don't need an async method.
    public Task<BlobUploadSasResult> GetUploadSasUrlAsync(string? fileExtension)
    {
        // TODO: do not accept empty, null or unsupported file extensions
        string ext = string.IsNullOrWhiteSpace(fileExtension) || !AllowedExtensions.Contains(fileExtension)
            ? string.Empty
            : fileExtension.ToLowerInvariant();

        string blobName = $"{Guid.NewGuid()}{ext}";

        // TODO: Cache the client in the .ctor to avoid recreating the connection on every call, may impact performance.
        var blobServiceClient = new BlobServiceClient(_options.ConnectionString);
        var containerClient = blobServiceClient.GetBlobContainerClient(_options.ContainerName);
        var blobClient = containerClient.GetBlobClient(blobName);

        var sasUri = blobClient.GenerateSasUri(
            BlobSasPermissions.Write | BlobSasPermissions.Create,
            DateTimeOffset.UtcNow.AddMinutes(15));
        
        // TODO: Use a typed url
        string blobUrl = $"https://{blobServiceClient.AccountName}.blob.core.windows.net/{_options.ContainerName}/{blobName}";

        return Task.FromResult(new BlobUploadSasResult(
            UploadUrl: sasUri.ToString(),
            BlobUrl: blobUrl,
            BlobName: blobName));
    }
}
