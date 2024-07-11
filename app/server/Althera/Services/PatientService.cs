using Althera.Models;

namespace Althera.Services;

public static class PatientService{

    static List<Patient> Patients {get;}
    static int nextId = 3;

    static PatientService(){
        Patients = new List<Patient> {
            new Patient { Id = 1, firstName = "testNom1", lastName = "testPrenom1"},
            new Patient { Id = 2, firstName = "testNom2", lastName = "testPrenom2"}
        };
    }

    public static List<Patient> GetAll() => Patients;

    public static Patient? Get(int id) => Patients.FirstOrDefault(p => p.Id == id);

    public static void Add(Patient patient){
        patient.Id = nextId++;
        Patients.Add(patient);
    }

    public static void Delete(int id){
        var patientId = Get(id);
        if(patientId is null){
            return;
        }
        Patients.Remove(patientId);
    }


    public static void Update(Patient patient){
        var index = Patients.FindIndex(patient => patient.Id == patient.Id);
        if(index == -1){
            return;
        }
        Patients[index] = patient;
    }
}