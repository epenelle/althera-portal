import React, { useEffect, useState } from 'react';
import { fetchPatients } from '@/api/patients';
import { Patient } from '@/Constants/Types';
import SelectMember from './AddOrderOptions/SelectMember';
import SelectSide from './AddOrderOptions/SelectSide';
import PatientSelector from './AddOrderOptions/PatientSelector';
import SelectFinger from './AddOrderOptions/SelectFinger';
import SelectFingerModel from './AddOrderOptions/SelectFingerModel';

const SelectModel = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedMember, setSelectedMember] = useState('');
  const [selectedSide, setSelectedSide] = useState('');
  const [selectedFinger, setSelectedFinger] = useState('');

  useEffect(() => {
    const loadPatients = async () => {
      const patientsData = await fetchPatients();
      setPatients(patientsData);
    };
    loadPatients();
  }, []);

  const handleButtonClick = (member: string) => {
    setSelectedMember(member);
    setSelectedSide('');
    setSelectedFinger('');
  };

  const handleWristClick = (wrist: string) => {
    setSelectedSide(wrist);
  };

  const handleFingerChange = (finger: string) => {
    setSelectedFinger(finger);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="grid grid-rows-2 w-5/6 mb-2 mt-4 pb-4 border-b-2 border-light-gray">
        <p className="flex justify-center underline font-bold text-lg">Patient : </p>
        <PatientSelector
          patients={patients}
          selectedPatient={selectedPatient}
          setSelectedPatient={setSelectedPatient}
          setPatients={setPatients}
        />
      </div>
      {selectedPatient && (
        <div className="grid grid-rows-2 w-5/6 mb-2 mt-4">
          <p className="flex justify-center underline font-bold text-lg">Membre concerné : </p>
          <SelectMember selectedMember={selectedMember} handleButtonClick={handleButtonClick} />
        </div>
      )}
      {selectedMember === 'poignet' && (
        <div className="grid grid-rows-2 w-5/6 mb-2 mt-4">
          <p className="flex justify-center underline font-bold text-lg">Poignet : </p>
          <SelectSide selectedSide={selectedSide} handleSideChange={handleWristClick} />
        </div>
      )}
      {selectedMember === 'doigts' && (
        <div className="grid grid-rows-2 w-5/6 mb-2 mt-4 pb-4 border-b-2 border-light-gray">
          <p className="flex justify-center underline font-bold text-lg">Doigt : </p>
          <SelectFinger selectedFinger={selectedFinger} handleFingerChange={handleFingerChange} />
        </div>
      )}
      {selectedFinger && (
        <div className="grid grid-rows-2 w-5/6 mb-2 mt-4 pb-4 border-b-2 border-light-gray">
          <p className="flex justify-center underline font-bold text-lg">Modèle : </p>
          <SelectFingerModel />
        </div>
      )}
    </div>
  );
};

export default SelectModel;
