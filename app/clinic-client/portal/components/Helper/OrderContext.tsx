import { Patient, Measurement } from '@/Constants/Types';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OrderContextProps {
  patient: Patient | null;
  setPatient: (patient: Patient | null) => void;
  member: string;
  setMember: (member: string) => void;
  finger: string;
  setFinger: (finger: string) => void;
  side: string;
  setSide: (side: string) => void;
  model: string;
  setModel: (model: string) => void;
  scanFile: File | null;
  setScanFile: (file: File | null) => void;
  measurements: Measurement[];
  setMeasurements: (measurements: Measurement[]) => void;
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [member, setMember] = useState<string>('');
  const [finger, setFinger] = useState<string>('');
  const [side, setSide] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [scanFile, setScanFile] = useState<File | null>(null);
  const [measurements, setMeasurements] = useState<Measurement[]>([]);

  return (
    <OrderContext.Provider
      value={{
        patient,
        setPatient,
        member,
        setMember,
        finger,
        setFinger,
        side,
        setSide,
        model,
        setModel,
        scanFile,
        setScanFile,
        measurements,
        setMeasurements,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrderContext must be used within an OrderProvider');
  }
  return context;
};
