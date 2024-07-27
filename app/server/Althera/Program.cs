using Althera.Models.Persistence;
using Althera.Services;

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
