using Althera.Api.Models;
using Althera.Domain;
using Althera.Models.Persistence;

namespace Althera.Extensions;

public static class ClinicExtensions
{
    public static Clinic ToDomain(this ClinicEntity clinicEntity)
    {
        return new Clinic
        {
            Id = clinicEntity.Id,
            Name = clinicEntity.Name,
            Address = new Site
            {
                Id = clinicEntity.Id,
                Name = clinicEntity.Name,
                Street = clinicEntity.Street,
                City = clinicEntity.City,
                Zip = clinicEntity.Zip,
            }
        };
    }

    public static ClinicModel ToApi(this Clinic clinicDomain)
    {
        return new ClinicModel
        {
            Id = clinicDomain.Id,
            Name = clinicDomain.Name,
            Site = clinicDomain.Address == null ? null : new SiteModel
            {
                Id = clinicDomain.Address.Id,
                Name = clinicDomain.Address.Name,
                Street = clinicDomain.Address.Street,
                City = clinicDomain.Address.City,
                Zip = clinicDomain.Address.Zip,
            }
        };
    }
}
