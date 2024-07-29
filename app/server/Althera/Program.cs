using Microsoft.EntityFrameworkCore;
using Althera.Services;
using Althera.Models;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder
            .WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
        );
});


// Ajouter DbContext
builder.Services.AddDbContext<AppDbContext>();

// Enregistrer vos services
builder.Services.AddScoped<PatientServices>();
builder.Services.AddScoped<OrderServices>();
builder.Services.AddScoped<ClinicServices>();

builder.Services.AddControllers();


// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

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
