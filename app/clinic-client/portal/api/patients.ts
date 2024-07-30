interface PatientData {
  id: number;
  idclinique: number;
  firstName: string;
  lastName: string;
  numSec: string;
}

const transformPatientData = (patient: any, index: number = 0): PatientData => ({
  id: patient.id || index + 1,
  idclinique: patient.clinicId || 1,
  firstName: patient.patientFirstname || "Unknown",
  lastName: patient.patientLastname || "Unknown",
  numSec: patient.healthInsuranceCard || "Unknown",
});

export const fetchPatients = async (): Promise<PatientData[]> => {
  try {
	const response = await fetch('http://localhost:5125/patient', {
	  method: "GET",
	  headers: {
		'Content-Type': 'application/json'
	  }
	});
	if (!response.ok) {
	  throw new Error(`HTTP error! status: ${response.status}`);
	}
	const json = await response.json();

	const patientsData: PatientData[] = json.map((patient: any, index: number) => transformPatientData(patient, index));

	return patientsData;
  } catch (error) {
	console.error('Error fetching patients:', error);
	throw error;
  }
};

export const fetchPatientById = async (id: number): Promise<PatientData> => {
  try {
	const response = await fetch(`http://localhost:5125/patient/${id}`, {
	  method: "GET",
	  headers: {
		'Content-Type': 'application/json'
	  }
	});
	if (!response.ok) {
	  throw new Error(`HTTP error! status: ${response.status}`);
	}
	const patient = await response.json();

	const patientData: PatientData = transformPatientData(patient);

	return patientData;
  } catch (error) {
	console.error(`Error fetching patient with id ${id}:`, error);
	throw error;
  }
};