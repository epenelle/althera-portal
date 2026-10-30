using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Portal.Services;

namespace azure_functions;

public class StorageController(
    IBlobStorageService blobStorageService,
    IClerkTokenValidator clerkTokenValidator,
    ILogger<StorageController> logger)
{
    // TODO: Allowed extensions are deduplicated in many classes / files. Consider refactoring to a central configuration or constant.
    private static readonly HashSet<string> AllowedExtensions =
        new(StringComparer.OrdinalIgnoreCase) { ".stl", ".obj" };

    private readonly IBlobStorageService _blobStorageService = blobStorageService;
    private readonly IClerkTokenValidator _clerkTokenValidator = clerkTokenValidator;
    private readonly ILogger<StorageController> _logger = logger;

    [Function("get-upload-url")]
    public async Task<IActionResult> GetUploadUrl(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "storage/upload-url")] HttpRequest req)
    {
        if (!req.Headers.TryGetValue("Authorization", out var authHeader) ||
            !authHeader.ToString().StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
        {
            return new UnauthorizedResult();
        }

        var token = authHeader.ToString()["Bearer ".Length..].Trim();

        if (!await _clerkTokenValidator.ValidateAsync(token))
        {
            return new UnauthorizedResult();
        }

        var extension = req.Query["extension"].ToString();

        if (!string.IsNullOrEmpty(extension) && !AllowedExtensions.Contains(extension))
        {
            return new BadRequestObjectResult(new { error = "Invalid file extension. Allowed: .stl, .obj" });
        }

        var result = await _blobStorageService.GetUploadSasUrlAsync(extension);

        _logger.LogInformation("Generated upload SAS URL for blob {BlobName}", result.BlobName);

        return new OkObjectResult(new
        {
            uploadUrl = result.UploadUrl,
            blobUrl = result.BlobUrl,
            blobName = result.BlobName,
        });
    }
}
