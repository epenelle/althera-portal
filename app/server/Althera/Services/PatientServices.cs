using System;
using System.Collections.Generic;
using System.Linq;
using Althera.Models;

namespace Althera.Services;

public class PatientServices {
    private readonly AppDbContext _dbContext;

    public PatientServices(AppDbContext dbContext)
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
            var patientModelService = new PatientModel{patientFirstname = patient.patientFirstname, patientLastname= patient.patientLastname, healthInsuranceCard = patient.healthInsuranceCard, clinicId= patient.clinicId };
            AllPatientModel.Add(patientModelService);
        }
        return AllPatientModel;
    }

    // Get Patient by ID
    public PatientModel? GetPatientById(int id)
    {
        var patient = _dbContext.Patients.SingleOrDefault(c => c.patientId == id);
        if(patient != null) return new PatientModel{patientFirstname = patient.patientFirstname, patientLastname= patient.patientLastname, healthInsuranceCard = patient.healthInsuranceCard, clinicId= patient.clinicId };
        else return null;
    }

    // Create new Patient
    public void CreatePatient(PatientModel patient)
    {
        
        _dbContext.Patients.Add(new PatientDB{patientFirstname = patient.patientFirstname, patientLastname= patient.patientLastname, healthInsuranceCard = patient.healthInsuranceCard, clinicId= patient.clinicId });
        _dbContext.SaveChanges();
    }

    // Edit Patient by ID
    public void UpdatePatient(int id, PatientModel updatedPatient)
    {
        var patient = _dbContext.Patients.SingleOrDefault(p => p.patientId == id);
        if (patient != null)
        {
            patient.patientFirstname = updatedPatient.patientFirstname;
            patient.patientLastname = updatedPatient.patientLastname;
            patient.healthInsuranceCard = updatedPatient.healthInsuranceCard;
            patient.clinicId = updatedPatient.clinicId;
            _dbContext.SaveChanges();
        }
    }

    // Delete Patient by ID
    public void DeletePatient(int id)
    {
        var patient = _dbContext.Patients.SingleOrDefault(p => p.patientId == id);
        if (patient != null)
        {
            _dbContext.Patients.Remove(patient);
            _dbContext.SaveChanges();
        }
    }


}