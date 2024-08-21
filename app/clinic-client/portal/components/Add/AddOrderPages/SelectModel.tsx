import React, { useEffect, useState } from 'react';
import { fetchPatients } from '@/api/patients';
import { Patient } from '@/Constants/Types';
import { useOrderContext } from '@/components/Helper/OrderContext';
import SelectMember from './SelectModelOptions/SelectMember';
import SelectSide from './SelectModelOptions/SelectSide';
import PatientSelector from './SelectModelOptions/PatientSelector';
import SelectFinger from './SelectModelOptions/SelectFinger';
import SelectFingerModel from './SelectModelOptions/SelectFingerModel';

const SelectModel = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const { patient, setPatient, member, setMember, finger, setFinger, side, setSide, model, setModel, scanFile } =
    useOrderContext();

  useEffect(() => {
    const loadPatients = async () => {
      const patientsData = await fetchPatients();
      setPatients(patientsData);
    };
    loadPatients();
  }, []);

  const handleButtonClick = (member: string) => {
    setMember(member);
    setSide('');
    setFinger('');
    setModel('');
  };

  const handleWristClick = (wrist: string) => {
    setSide(wrist);
  };

  const handleFingerChange = (finger: string) => {
    setFinger(finger);
  };

  const handleModelChange = (model: string) => {
    setModel(model);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="grid grid-rows-2 w-5/6 mb-2 mt-4 pb-4 border-b-2 border-light-gray">
        <p className="flex justify-center underline font-bold text-lg">Patient : </p>
        <PatientSelector
          patients={patients}
          selectedPatient={patient}
          setSelectedPatient={setPatient}
          setPatients={setPatients}
        />
      </div>
      {patient && (
        <div className="grid grid-rows-2 w-5/6 mb-2 mt-4">
          <p className="flex justify-center underline font-bold text-lg">Membre concerné : </p>
          <SelectMember selectedMember={member} handleButtonClick={handleButtonClick} />
        </div>
      )}
      {member === 'poignet' && (
        <div className="grid grid-rows-2 w-5/6 mb-2 mt-4">
          <p className="flex justify-center underline font-bold text-lg">Poignet : </p>
          <SelectSide selectedSide={side} handleSideChange={handleWristClick} />
        </div>
      )}
      {member === 'doigts' && (
        <div className="grid grid-rows-2 w-5/6 mb-2 mt-4 pb-4 border-b-2 border-light-gray">
          <p className="flex justify-center underline font-bold text-lg">Doigt : </p>
          <SelectFinger selectedFinger={finger} handleFingerChange={handleFingerChange} />
        </div>
      )}
      {finger && (
        <div className="grid grid-rows-2 w-5/6 mb-2 mt-4 pb-4 border-b-2 border-light-gray">
          <p className="flex justify-center underline font-bold text-lg">Modèle : </p>
          <SelectFingerModel selectedModel={model} handleModelChange={handleModelChange} />
        </div>
      )}
    </div>
  );
};

export default SelectModel;
