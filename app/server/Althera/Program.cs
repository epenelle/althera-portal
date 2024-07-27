using Althera.Models.Persistence;
using Althera.Services;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
// Add services to the container.

services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder
            .WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
        );
});

services.AddDbContext<AppDbContext>();
services.AddScoped<PatientsService>();
services.AddScoped<OrdersService>();
services.AddScoped<ClinicsService>();

services.AddControllers();

// services.AddEndpointsApiExplorer();
// services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    // app.UseSwagger();
    // app.UseSwaggerUI();
}

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
