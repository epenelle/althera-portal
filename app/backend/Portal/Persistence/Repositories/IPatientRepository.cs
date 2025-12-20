using Portal.Models;
using Portal.Persistence.Models;
using System.Threading;
using System.Threading.Tasks;
using PatientModel = Portal.Persistence.Models.PatientModel;

namespace Portal.Repositories;

public interface IPatientRepository
{
    Task<PatientModel> CreateAsync(Patient patient, CancellationToken cancellationToken);
    Task<List<PatientModel>> GetAll(CancellationToken ct);
    Task<PatientModel?> GetAsync(Guid id, CancellationToken cancellationToken);
}