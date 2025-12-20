using Portal.Models;
using Portal.Options;
using Portal.Persistence.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Portal.Repositories;

public class MongoPatientRepository : IPatientRepository
{
    private readonly IMongoCollection<PatientModel> _patients;
    
    public MongoPatientRepository(IOptions<MongoDBOptions> options)
    {
        MongoDBOptions mongoDBOptions = options.Value;
        MongoClient client = new MongoClient(mongoDBOptions.ConnectionString);
        IMongoDatabase database = client.GetDatabase(mongoDBOptions.DatabaseName);
        _patients = database.GetCollection<PatientModel>(mongoDBOptions.PatientsCollection);
    }
    
    public async Task<PatientModel> CreateAsync(Patient patient, CancellationToken cancellationToken)
    {
        PatientModel patientModel = patient.FromDomain();
        await _patients.InsertOneAsync(patientModel, options: null, cancellationToken);
        return patientModel;
    }

    public async Task<List<PatientModel>> GetAll(CancellationToken ct)
    {
        return await (
            await _patients
            .FindAsync(_ => true, null, ct)
        ).ToListAsync(ct);
    }

    public async Task<PatientModel?> GetAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _patients
            .Find(p => p.PatientId == id)
            .FirstOrDefaultAsync(cancellationToken);
    }
}