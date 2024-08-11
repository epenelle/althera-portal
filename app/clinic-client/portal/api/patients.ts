import { Patient } from "@/Constants/Types";

const transformPatientData = (patient: any, index: number = 0): Patient => ({
  id: patient.id || index + 1,
  firstName: patient.firstName || "Unknown",
  lastName: patient.lastName || "Unknown",
  healthInsuranceNumber: patient.healthInsuranceNumber || "Unknown",
});

export const fetchPatients = async (): Promise<Patient[]> => {
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
	const patientsData: Patient[] = json.map((patient: any, index: number) => transformPatientData(patient, index));
	return patientsData;
  } catch (error) {
	console.error('Error fetching patients:', error);
	throw error;
  }
};

export const fetchPatientById = async (id: string): Promise<Patient> => {
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
	const patientData: Patient = transformPatientData(patient);
	return patientData;
  } catch (error) {
	console.error(`Error fetching patient with id ${id}:`, error);
	throw error;
  }
};

export const addPatient = async (patient: Patient): Promise<{ success: boolean; message: string }> => {
    try {
        const response = await fetch('http://localhost:5125/patients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patient) 
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        await response.json();
        return {
            success: true,
            message: 'Patient added successfully'
        };
    } catch (error) {
        console.error('Error adding patient:', error);
        return {
            success: false,
            message: `Error adding patient: ${(error as Error).message}`
        };
    }
};

export const deleteById = async (id: string): Promise<{ success: boolean }> => {
	try {
	  const response = await fetch(`http://localhost:5125/patients/${id}`, {
		method: "DELETE",
		headers: {
		  'Content-Type': 'application/json'
		}
	});
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	return {
		success: true,
	};
	} catch (error) {
	console.error('Error deleting patient:', error);
		return {
			success: false,
		};
	}
};