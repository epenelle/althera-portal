import { API_BASE_URL, defaultHeaders } from './config';

const getUrlWithKey = (endpoint: string) => {
    const route = `${API_BASE_URL}${endpoint}`;
    console.log('API_BASE_URL:', API_BASE_URL);
    console.log('API Route:', route);
    return route;
};

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

export async function getPatients(): Promise<Patient[]> {
    const response = await fetch(getUrlWithKey('/patients'), {
        method: 'GET',
        headers: defaultHeaders,
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export async function getPatient(id: string): Promise<Patient> {
    const response = await fetch(getUrlWithKey(`/patients/${id}`), {
        method: 'GET',
        headers: defaultHeaders,
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch patients, status: ${response.status}`);
    }

    return response.json();
}

export async function createPatient(createPatientRequest: CreatePatientRequest): Promise<Patient> {
    const response = await fetch(getUrlWithKey('/patients'), {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(createPatientRequest),
    });

    if (!response.ok) {
        throw new Error(`Failed to create patient, status: ${response.status}`);
    }

    return response.json();
}
