using Althera.Models;
using Althera.Models.Persistence;

namespace Althera.Services;

public class ClinicsService {
    private readonly AppDbContext _dbContext;

    public ClinicsService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Clinic

    // Get All Clinic
    public List<ClinicModel> GetAllClinics()
    {
        var AllClinics = _dbContext.Clinics.ToList();
        var AllClinicModel = new List<ClinicModel>();
        foreach (var clinic in AllClinics) {
            var clinicModelService = new ClinicModel{clinicName = clinic.clinicName, clinicAddress= clinic.clinicAddress, clinicPassword = clinic.clinicPassword };
            AllClinicModel.Add(clinicModelService);
        }
        return AllClinicModel;
    }

    // Get Clinic by ID
    public ClinicModel? GetCliniqueById(int id)
    {
        var MyClinic = _dbContext.Clinics.SingleOrDefault(c => c.clinicId == id);
        if(MyClinic != null) return new ClinicModel{clinicName = MyClinic.clinicName, clinicAddress= MyClinic.clinicAddress, clinicPassword = MyClinic.clinicPassword}; 
        else return null;
    }

    // Create Clinic
    public void CreateClinic(ClinicModel clinic)
    {
        _dbContext.Clinics.Add(new ClinicDB{clinicName= clinic.clinicName, clinicAddress= clinic.clinicAddress, clinicPassword=clinic.clinicPassword });
        _dbContext.SaveChanges();
    }

    // Edit Clinic by ID
    public void UpdateClinic(int id, ClinicModel updatedClinic)
    {
        var clinic = _dbContext.Clinics.SingleOrDefault(c => c.clinicId == id);
        if (clinic != null)
        {
            clinic.clinicName = updatedClinic.clinicName;
            clinic.clinicPassword = updatedClinic.clinicPassword;
            clinic.clinicAddress = updatedClinic.clinicAddress;
            _dbContext.SaveChanges();
        }
    }

    // Delete Clinic by ID
    public void DeleteClinic(int id)
    {
        var clinic = _dbContext.Clinics.SingleOrDefault(c => c.clinicId == id);
        if (clinic != null)
        {
            _dbContext.Clinics.Remove(clinic);
            _dbContext.SaveChanges();
        }
    }

}
