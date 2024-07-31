interface PatientData {
  id: number;
  firstName: string;
  lastName: string;
  numSec: string;
}

const transformPatientData = (patient: any, index: number = 0): PatientData => ({
  id: patient.id || index + 1,
  firstName: patient.firstName || "Unknown",
  lastName: patient.lastName || "Unknown",
  numSec: patient.healthInsuranceNumber || "Unknown",
});

export const fetchPatients = async (): Promise<PatientData[]> => {
  try {
	const response = await fetch('http://localhost:5125/patients', {
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

export const fetchPatientById = async (id: string): Promise<PatientData> => {
  try {
	const response = await fetch(`http://localhost:5125/patients/${id}`, {
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