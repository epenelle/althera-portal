using Althera.Api.Models;
using Althera.Domain;
using Althera.Models.Persistence;

namespace Althera.Extensions;

public static class PatientExtensions
{
    public static Patient ToDomain(this PatientEntity patientEntity)
    {
        return new Patient
        {
            Id = patientEntity.Id,
            FirstName = patientEntity.FirstName,
            LastName = patientEntity.LastName,
            HealthInsuranceNumber = patientEntity.HealthInsuranceNumber,
            ClinicId = patientEntity.ClinicId,
        };
    }

    public static PatientModel ToApi(this Patient patientDomain)
    {
        return new PatientModel
        {
            Id = patientDomain.Id,
            FirstName = patientDomain.FirstName,
            LastName = patientDomain.LastName,
            HealthInsuranceNumber = patientDomain.HealthInsuranceNumber,
        };
    }
}
