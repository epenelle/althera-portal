using Althera.Models.Api;
using Althera.Models.Persistence;

namespace Althera.Services;

public class ClinicsService
{
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
        foreach (var clinic in AllClinics)
        {
            var clinicModelService = new ClinicModel { ClinicName = clinic.Name, ClinicAddress = clinic.Address, ClinicPassword = clinic.Password };
            AllClinicModel.Add(clinicModelService);
        }

        return AllClinicModel;
    }

    // Get Clinic by ID
    public ClinicModel? GetCliniqueById(int id)
    {
        var MyClinic = _dbContext.Clinics.SingleOrDefault(c => c.Id == id);
        if (MyClinic != null)
        {
            return new ClinicModel { ClinicName = MyClinic.Name, ClinicAddress = MyClinic.Address, ClinicPassword = MyClinic.Password };
        }
        else
        {
            return null;
        }
    }

    // Create Clinic
    public void CreateClinic(ClinicModel clinic)
    {
        _dbContext.Clinics.Add(new ClinicEntity { Name = clinic.ClinicName, Address = clinic.ClinicAddress, Password = clinic.ClinicPassword });
        _dbContext.SaveChanges();
    }

    // Edit Clinic by ID
    public void UpdateClinic(int id, ClinicModel updatedClinic)
    {
        var clinic = _dbContext.Clinics.SingleOrDefault(c => c.Id == id);
        if (clinic != null)
        {
            clinic.Name = updatedClinic.ClinicName;
            clinic.Password = updatedClinic.ClinicPassword;
            clinic.Address = updatedClinic.ClinicAddress;
            _dbContext.SaveChanges();
        }
    }

    // Delete Clinic by ID
    public void DeleteClinic(int id)
    {
        var clinic = _dbContext.Clinics.SingleOrDefault(c => c.Id == id);
        if (clinic != null)
        {
            _dbContext.Clinics.Remove(clinic);
            _dbContext.SaveChanges();
        }
    }
}
