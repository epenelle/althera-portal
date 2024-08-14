using Althera.Api.Requests;
using Althera.Domain;
using Althera.Extensions;
using Althera.Models.Persistence;
using Althera.Persistence;

namespace Althera.Services;

public class PatientsService(AppDbContext dbContext)
{
    private readonly AppDbContext _dbContext = dbContext;

    public List<Patient> GetAll()
    {
        var patientEntities = _dbContext.Patients.ToList();
        return patientEntities.Select(patient => patient.ToDomain()).ToList();
    }

    /*
    // Get all patient Including soft deleted
    public async Task<List<PatientDB>> GetAllPatientsIncludingDeletedAsync()
    {
        return await _context.Patients.IgnoreQueryFilters().ToListAsync();
    }
    */

    public Patient? GetPatient(long id)
    {
        var patientEntity = _dbContext.Patients.SingleOrDefault(x => x.Id == id);
        return patientEntity?.ToDomain();
    }

    public Patient CreatePatient(PatientCreateRequest patientCreateRequest)
    {
        var patientEntity = new PatientEntity
        {
            FirstName = patientCreateRequest.FirstName,
            LastName = patientCreateRequest.LastName,
            HealthInsuranceNumber = patientCreateRequest.HealthInsuranceNumber,
            ClinicId = patientCreateRequest.ClinicId,
        };
        _dbContext.Patients.Add(patientEntity);
        _dbContext.SaveChanges();

        return patientEntity.ToDomain();
    }

    public Patient UpdatePatient(long id, PatientUpdateRequest patientUpdateRequest)
    {
        var patientEntity = _dbContext.Patients.SingleOrDefault(p => p.Id == id) ?? throw new InvalidOperationException("Patient not found.");

        patientEntity.FirstName = string.IsNullOrEmpty(patientUpdateRequest.FirstName) ? patientEntity.FirstName : patientUpdateRequest.FirstName;
        patientEntity.LastName = string.IsNullOrEmpty(patientUpdateRequest.LastName) ? patientEntity.LastName : patientUpdateRequest.LastName;
        patientEntity.HealthInsuranceNumber = string.IsNullOrEmpty(patientUpdateRequest.HealthInsuranceNumber) ? patientEntity.HealthInsuranceNumber : patientUpdateRequest.HealthInsuranceNumber;
        _dbContext.SaveChanges();

        return patientEntity.ToDomain();

    }
/*
    public void DeletePatient(long id)
    {
        // TODO : We might want to 'soft delete' patients, since some orders might be related to it.
        var patient = _dbContext.Patients.SingleOrDefault(p => p.Id == id) ?? throw new InvalidOperationException("Patient not found.");
        _dbContext.Patients.Remove(patient);
        _dbContext.SaveChanges();
    }*/
     public void DeletePatient(long id)
    {
        var patient = _dbContext.Patients.SingleOrDefault(p => p.Id == id);
        if(patient != null){
            patient.IsDeleted = true;
            patient.DeleteTime = DateTime.UtcNow;
             _dbContext.SaveChanges();
        }
    }
}