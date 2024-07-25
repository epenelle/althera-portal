using Althera.Models;
using System;

namespace Althera.Services;

public record ClinicModel {
    public string? clinicName { get; set; }
    public string? clinicPassword { get; set; }
    public string? clinicAddress { get; set; }

}

public record PatientModel {
    public string? patientFirstname { get; set; }
    public string? patientLastname { get; set; }
    public int? healthInsuranceCard { get; set; }

    // Clé étrangère
    public int clinicId { get; set; }
}

public record OrderModel {
    public string? orthesisModel { get; set; }
    public string? orthesisInfo { get; set; }
    public string? orthesisScan { get; set; }
    public DateTime? orderDate { get; set; }
    public string? orderState { get; set; }
    public string? orthesisComment { get; set; }
    public int patientId { get; set; }
}
