import React, { createContext, useState, useEffect, ReactNode } from 'react';

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
	  const response = await fetch('/api/patients');
	  const data = await response.json();
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