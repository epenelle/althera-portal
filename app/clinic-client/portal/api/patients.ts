interface PatientData {
  id: number;
  idclinique: number;
  firstName: string;
  lastName: string;
  numSec: string;
}

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

	// Transformation des données reçues
	const patientsData: PatientData[] = json.map((patient: any, index: number) => ({
	  id: index + 1,
	  idclinique: patient.idclinique || 1, // Remplacez par la logique appropriée si nécessaire
	  firstName: patient.firstName || "Unknown",
	  lastName: patient.lastName || "Unknown",
	  numSec: patient.numSec || "Unknown",
	}));

	return patientsData;
  } catch (error) {
	console.error('Error fetching patients:', error);
	throw error;
  }
};