import { fetchPatients } from '@/api/patients';
import { Patient } from '@/Constants/Types';
import React, { useEffect, useState } from 'react';
import Select, { GroupBase, components } from 'react-select';
import Modal from 'react-modal';
import AddPatient from '../Add/AddPatient';

type PatientOption = {
  value: Patient;
  label: string;
};

interface EditPProps {
  patient?: Patient;
}

const EditPatient: React.FC<EditPProps> = ({ patient }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isAddPatientModalVisible, setIsAddPatientModalVisible] = useState(false);

  useEffect(() => {
    const loadPatients = async () => {
      const patientsData = await fetchPatients();
      setPatients(patientsData);
    };
    loadPatients();
  }, []);

  useEffect(() => {
    if (patient) {
      setSelectedPatient(patient);
    }
  }, [patient]);

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
    <div className="flex items-center mb-2">
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
      <label className="w-2/5 text-right whitespace-nowrap">Patient : </label>
      <Select
        className="ml-4 w-56"
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
  );
};

export default EditPatient;
