using Portal.Dto;
using Portal.Models;

namespace Portal.Services;

public interface IPatientService
{
    Task<Patient> CreatePatientAsync(PatientCreateRequest patientCreateRequest, CancellationToken cancellationToken);
    Task<Patient?> GetPatientAsync(Guid id, CancellationToken cancellationToken);
    Task<List<Patient>> GetPatientsAsync(CancellationToken ct);
}