using Althera.Models.Persistence;
using Althera.Services;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddCors(options =>
    {
        options.AddPolicy("AllowSpecificOrigin",
            builder => builder
                .WithOrigins("http://localhost:3000")
                .AllowAnyMethod()
                .AllowAnyHeader()
            );
    })
    .AddDbContext<AppDbContext>()
    .AddScoped<PatientsService>()
    .AddScoped<OrdersService>()
    .AddScoped<ClinicsService>()
    .AddControllers();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Althera Portal API",
        Version = "v1",
        Description = "Welcome to the Althera Portal API documentation. This API adheres to RESTful principles, offering a comprehensive set of endpoints to interact with the Althera Portal.",
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "Althera Portal API V1");
    });
}

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("AllowSpecificOrigin");
app.UseAuthorization();
app.MapControllers();
app.Run();

/*
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
*/
