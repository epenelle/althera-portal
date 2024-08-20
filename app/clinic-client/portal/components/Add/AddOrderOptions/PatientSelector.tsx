import React, { useState } from 'react';
import Select, { GroupBase, components } from 'react-select';
import { Patient } from '@/Constants/Types';
import Modal from 'react-modal';
import AddPatient from '../AddPatient';

interface PatientOption {
  value: Patient;
  label: string;
}

interface PatientSelectorProps {
  patients: Patient[];
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient | null) => void;
  setPatients: (patients: Patient[]) => void;
}

const PatientSelector: React.FC<PatientSelectorProps> = ({
  patients,
  selectedPatient,
  setSelectedPatient,
  setPatients,
}) => {
  const [isAddPatientModalVisible, setIsAddPatientModalVisible] = useState(false);

  const patientOptions: GroupBase<PatientOption>[] = [
    {
      options: patients.map((patient) => ({
        value: patient,
        label: `${patient.firstName} ${patient.lastName}`,
      })),
    },
  ];

  const handlePatientChange = (selectedOption: PatientOption | null) => {
    setSelectedPatient(selectedOption?.value || null);
  };

  const handleAddPatient = (newPatient: Patient) => {
    setPatients([...patients, newPatient]);
    setSelectedPatient(newPatient);
    setIsAddPatientModalVisible(false);
  };

  const MenuList = (props: any) => (
    <components.MenuList {...props}>
      <button onClick={() => setIsAddPatientModalVisible(true)} className="w-full text-left p-2 bg-blue-500 text-white">
        Créer un nouveau patient
      </button>
      {props.children}
    </components.MenuList>
  );

  return (
    <div className="flex justify-center items-center">
      <Select
        className="ml-4 w-3/5"
        options={patientOptions}
        value={
          selectedPatient
            ? {
                value: selectedPatient,
                label: `${selectedPatient.firstName} ${selectedPatient.lastName}`,
              }
            : null
        }
        onChange={handlePatientChange}
        placeholder="Sélectionner un patient"
        components={{ MenuList }}
      />
      {isAddPatientModalVisible && (
        <Modal
          isOpen={isAddPatientModalVisible}
          onRequestClose={() => setIsAddPatientModalVisible(false)}
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          className="relative bg-white rounded-lg p-6 w-full max-w-lg mx-auto z-50 focus:outline-none"
        >
          <AddPatient onClose={() => setIsAddPatientModalVisible(false)} onPatientAdded={handleAddPatient} />
        </Modal>
      )}
    </div>
  );
};

export default PatientSelector;
