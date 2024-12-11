import React, { useState } from 'react';
import PopUp from '../Helper/PopUp';
import { BsPeopleFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { addPatient } from '@/api/patients';
import { Patient, PopUpVariant } from '@/Constants/Types';

type AddPatientProps = {
  onClose: () => void;
  onPatientAdded: (patient: Patient) => void;
};

const AddPatient: React.FC<AddPatientProps> = ({ onClose, onPatientAdded }) => {
  const router = useRouter();
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [typePopUp, setTypePopUp] = useState<PopUpVariant>('default');
  const [messagePopUp, setMessagePopUp] = useState('');

  const [lastName, setLastName] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [numAssu, setNumAssu] = useState<string>('');
  const isFormValid = firstName && lastName && numAssu;

  const handleOk = () => {
    setIsPopUpVisible(false);
    onClose();
  };

  const handleCancel = () => {
    setIsPopUpVisible(false);
  };

  const showPopUp = (message: string, type: PopUpVariant) => {
    setMessagePopUp(message);
    setTypePopUp(type);
    setIsPopUpVisible(true);
  };

  const handleAddPatient = async () => {
    try {
      const response = await addPatient({
        firstName,
        lastName,
        healthInsuranceNumber: numAssu,
        ClinicId: '1',
      });
      if (response.success) {
        showPopUp('Le patient a bien été ajouté !', 'confirmation');
        if (response.patient) {
          onPatientAdded(response.patient);
        }
      } else {
        showPopUp("Erreur lors de l'ajout du patient !", 'default');
      }
    } catch (error) {
      console.error('Error adding patient:', error);
      showPopUp("Erreur lors de l'ajout du patient !", 'default');
    }
  };

  return (
    <div>
      {isPopUpVisible && <PopUp message={messagePopUp} variant={typePopUp} onOk={handleOk} onCancel={handleCancel} />}
      <div className="border-b-2 border-light-gray pb-4 flex items-center justify-center">
        <BsPeopleFill size={30} className="mr-2" />
        <h1 className="text-center font-bold text-3xl p-2 md:text-4x1 text-secondary-dark-blue">Ajout patient</h1>
      </div>
      <div className="flex items-center mb-4 mt-8">
        <label className="w-2/5 text-right whitespace-nowrap">Prénom</label>
        <input
          type="text"
          required
          className="input-common"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          autoFocus
        />
      </div>
      <div className="flex flex-col mb-2">
        <div className="flex items-center mb-2">
          <label className="w-2/5 text-right whitespace-nowrap">Nom</label>
          <input
            type="text"
            required
            className="input-common"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="flex items-center mb-2">
          <label className="w-2/5 text-right whitespace-nowrap">
            NAS
          </label>
          <input
            type="text"
            required
            className="input-common"
            value={numAssu}
            onChange={(e) => setNumAssu(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="h-11 pl-5 pr-5 bg-primary-light-blue outline-none rounded-full shadow-sm cursor-pointer text-base text-white font-semibold
          transform active:scale-95 transition duration-150 ease-in-out hover:bg-secondary-medium-blue disabled:bg-medium-gray"
          disabled={!isFormValid}
          onClick={handleAddPatient}
        >
          Ajouter patient
        </button>
      </div>
    </div>
  );
};

export default AddPatient;
