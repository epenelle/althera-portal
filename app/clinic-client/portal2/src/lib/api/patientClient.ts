import { getPatients, getPatient, createPatient } from './patientActions';
export type { Patient, CreatePatientRequest } from './patientActions';

// For backward compatibility (I do not want to change components that depend on the patientClient)
export const patientClient = {
    getPatients,
    getPatient,
    createPatient
};
