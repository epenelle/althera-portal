using Portal.Dto;
using Portal.Persistence.Models;
using Portal.Repositories;
using Patient = Portal.Models.Patient;

namespace Portal.Services;

public class PatientService : IPatientService
{
    private readonly IPatientRepository _patientRepository;
    
    public PatientService(IPatientRepository patientRepository)
    {
        _patientRepository = patientRepository;
    }

    public async Task<Patient> CreatePatientAsync(PatientCreateRequest patientCreateRequest, CancellationToken cancellationToken)
    {
        Patient patient = new()
        {
            Id = Guid.NewGuid(),
            FirstName = patientCreateRequest.FirstName,
            LastName = patientCreateRequest.LastName,
            Email = patientCreateRequest.Email,
            Phone = patientCreateRequest.Phone,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
        };
        await _patientRepository.CreateAsync(patient, cancellationToken);
        return patient;
    }

    public async Task<Patient?> GetPatientAsync(Guid id, CancellationToken cancellationToken)
    {
        PatientModel? patientModel = await _patientRepository.GetAsync(id, cancellationToken);
        return patientModel?.ToDomain();
    }

    public async Task<List<Patient>> GetPatientsAsync(CancellationToken ct)
    {
        List<PatientModel> patients = await _patientRepository.GetAll(ct);
        return [.. patients.Select(p => p.ToDomain())];
    }
}