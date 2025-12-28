import { API_BASE_URL, defaultHeaders } from './config';

export interface Patient {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    phone: string;
}

export interface CreatePatientRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
}

export const patientClient = {
    async getPatients(): Promise<Patient[]> {
        const response = await fetch(`${API_BASE_URL}/patients`, {
            method: 'GET',
            headers: defaultHeaders,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    },

    async getPatient(id: string): Promise<Patient> {
        const response = await fetch(`${API_BASE_URL}/patients/${id}`, {
            method: 'GET',
            headers: defaultHeaders,
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch patients, status: ${response.status}`);
        }

        return response.json();
    }
    ,

    async createPatient(createPatientRequest: CreatePatientRequest): Promise<Patient> {
        const response = await fetch(`${API_BASE_URL}/patients`, {
            method: 'POST',
            headers: defaultHeaders,
            body: JSON.stringify(createPatientRequest),
        });

        if (!response.ok) {
            throw new Error(`Failed to create patient, status: ${response.status}`);
        }

        return response.json();
    }
};