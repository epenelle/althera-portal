import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { fetchPatients as fetchPatientsFromAPI } from '@/api/patients';

interface Patient {
  id: number;
  idclinique: number;
  firstName: string;
  lastName: string;
  numSec: string;
}

interface PatientsContextProps {
  patients: Patient[];
  fetchPatients: () => void;
}

export const PatientsContext = createContext<PatientsContextProps | undefined>(undefined);

export const PatientsProvider = ({ children }: { children: ReactNode }) => {
  const [patients, setPatients] = useState<Patient[]>([]);

  const fetchPatients = async () => {
    try {
      const data = await fetchPatientsFromAPI();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <PatientsContext.Provider value={{ patients, fetchPatients }}>
      {children}
    </PatientsContext.Provider>
  );
};