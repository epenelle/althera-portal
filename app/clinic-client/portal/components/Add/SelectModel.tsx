import React, { useEffect, useState } from 'react';
import Select, { GroupBase, components } from 'react-select';
import { fetchPatients } from '@/api/patients';
import { Order, Patient } from '@/Constants/Types';
import Modal from 'react-modal';
import AddPatient from './AddPatient';

type PatientOption = {
  value: Patient;
  label: string;
};

const SelectModel = () => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [typePopUp, setTypePopUp] = useState(false);
  const [messagePopUp, setMessagePopUp] = useState('');

  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isAddPatientModalVisible, setIsAddPatientModalVisible] =
    useState(false);

  useEffect(() => {
    const loadPatients = async () => {
      const patientsData = await fetchPatients();
      setPatients(patientsData);
    };
    loadPatients();
  }, []);

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
      <button
        onClick={() => setIsAddPatientModalVisible(true)}
        className="w-full text-left p-2 bg-blue-500 text-white"
      >
        Créer un nouveau patient
      </button>
      {props.children}
    </components.MenuList>
  );

  return (
    <div className="flex flex-col items-center w-full">
      {isAddPatientModalVisible && (
        <Modal
          isOpen={isAddPatientModalVisible}
          onRequestClose={() => setIsAddPatientModalVisible(false)}
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          className="relative bg-white rounded-lg p-6 w-full max-w-lg mx-auto z-50 focus:outline-none"
        >
          <AddPatient
            onClose={() => setIsAddPatientModalVisible(false)}
            onPatientAdded={handleAddPatient}
          />
        </Modal>
      )}
      <div className="flex justify-center items-center mb-2 w-5/6">
        <label className="text-right whitespace-nowrap">Patient : </label>
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
      </div>
      {selectedPatient && (
        <div className="flex items-center mb-2 mt-4 w-5/6">
          <button className="bg-white p-2 rounded mr-2 w-1/3 border-2 border-black">
            Poignet
          </button>
          <button className="bg-primary-light-blue text-white p-2 rounded w-2/3 border-2 border-black">
            Doigts
          </button>
        </div>
      )}
    </div>
  );
};

export default SelectModel;
