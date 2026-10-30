using azure_functions;
using Portal.Options;
using Portal.Repositories;
using Portal.Services;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

IHostBuilder builder = new HostBuilder()
    .ConfigureFunctionsWebApplication()
    .ConfigureServices(services =>
    {
        services.AddApplicationInsightsTelemetryWorkerService();
        services.ConfigureFunctionsApplicationInsights();
        services.AddHttpClient();
        services.AddOptions<MongoDBOptions>().BindConfiguration("MongoDB");
        services.AddOptions<AzureBlobStorageOptions>().BindConfiguration("BlobStorage");
        services.AddSingleton<IPatientRepository, MongoPatientRepository>();
        services.AddSingleton<IPatientService, PatientService>();
        services.AddSingleton<IOrderService, OrderService>();
        services.AddSingleton<IOrderRepository, MongoOrderRepository>();
        services.AddSingleton<IBlobStorageService, BlobStorageService>();
        services.AddSingleton<IClerkTokenValidator, ClerkTokenValidator>();
    });
    builder.ConfigureAppConfiguration((context, config) =>
    {
        config.AddEnvironmentVariables();
        config.AddJsonFile("local.settings.json", optional: true, reloadOnChange: true);
    });

IHost host = builder.Build();
host.Run();
