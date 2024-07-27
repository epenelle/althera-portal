namespace Althera.Models.Api;

public record ClinicModel
{
    public ClinicModel(string name)
    {
        Name = name;
    }

    public string Name { get; set; }

    public string? Address { get; set; }
}
