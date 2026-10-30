namespace Portal.Options;

public class AzureBlobStorageOptions
{
    public required string ConnectionString { get; init; }
    public required string ContainerName { get; init; }
}
