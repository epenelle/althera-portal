using Althera.Models;
using Althera.Models.Persistence;

namespace Althera.Services;

public class PatientsService {
    private readonly AppDbContext _dbContext;

    public PatientsService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Patients

    // Get All Patient
    public List<PatientModel> GetAllPatients()
    {
        var Allpatients = _dbContext.Patients.ToList();
        var AllPatientModel = new List<PatientModel>();
        foreach (var patient in Allpatients) {
            var patientModelService = new PatientModel{patientFirstname = patient.FirstName, patientLastname= patient.LastName, healthInsuranceCard = patient.HealthInsuranceNumber, clinicId= patient.ClinicId };
            AllPatientModel.Add(patientModelService);
        }
        return AllPatientModel;
    }

    // Get Patient by ID
    public PatientModel? GetPatientById(int id)
    {
        var patient = _dbContext.Patients.SingleOrDefault(c => c.Id == id);
        if(patient != null) return new PatientModel{patientFirstname = patient.FirstName, patientLastname= patient.LastName, healthInsuranceCard = patient.HealthInsuranceNumber, clinicId= patient.ClinicId };
        else return null;
    }

    // Create new Patient
    public void CreatePatient(PatientModel patient)
    {
        
        _dbContext.Patients.Add(new PatientDB{FirstName = patient.patientFirstname, LastName= patient.patientLastname, HealthInsuranceNumber = patient.healthInsuranceCard, ClinicId= patient.clinicId });
        _dbContext.SaveChanges();
    }

    // Edit Patient by ID
    public void UpdatePatient(int id, PatientModel updatedPatient)
    {
        var patient = _dbContext.Patients.SingleOrDefault(p => p.Id == id);
        if (patient != null)
        {
            patient.FirstName = updatedPatient.patientFirstname;
            patient.LastName = updatedPatient.patientLastname;
            patient.HealthInsuranceNumber = updatedPatient.healthInsuranceCard;
            patient.ClinicId = updatedPatient.clinicId;
            _dbContext.SaveChanges();
        }
    }

    // Delete Patient by ID
    public void DeletePatient(int id)
    {
        var patient = _dbContext.Patients.SingleOrDefault(p => p.Id == id);
        if (patient != null)
        {
            _dbContext.Patients.Remove(patient);
            _dbContext.SaveChanges();
        }
    }


}