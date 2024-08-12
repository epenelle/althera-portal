import React, { useState } from 'react';
import PopUp from '../Helper/PopUp';
import { BsPeopleFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { addPatient } from '@/api/patients';

type AddOrderProps = {
  onClose: () => void;
};


const AddPatient: React.FC<AddOrderProps> = ({ onClose }) => {
  const router = useRouter();
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [typePopUp, setTypePopUp] = useState(false);
  const [messagePopUp, setMessagePopUp] = useState("");

  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [numAssu, setNumAssu] = useState<string>("");
  const isFormValid = firstName && lastName && numAssu;

  const handleOk = () => {
    setIsPopUpVisible(false);
    onClose();
  };

  const handleCancel = () => {
    setIsPopUpVisible(false);
  };

  const showPopUp = (message: string, type: boolean) => {
    setMessagePopUp(message);
    setTypePopUp(type);
    setIsPopUpVisible(true);
  };

  const handleAddPatient = async () => {
    try {
      const response = await addPatient({ firstName, lastName, healthInsuranceNumber: numAssu, ClinicId: '1' });
      if (response.success) {
        showPopUp("Le patient a bien été ajouté !", false);
      } else {
        showPopUp("Erreur lors de l'ajout du patient.", true);
      }
    } catch (error) {
      showPopUp("Erreur lors de l'ajout du patient.", true);
    }
  };

  return (
    <div>
      {isPopUpVisible && (
        <PopUp
          message={messagePopUp}
          type={typePopUp}
          onOk={handleOk}
          onCancel={handleCancel}
        />
      )}
      <div className='border-b-2 border-light-gray pb-4 flex items-center justify-center'>
        <BsPeopleFill size={30} className='mr-2' />
        <h1 className='text-center font-bold text-3xl p-2 md:text-4x1 text-secondary-dark-blue'>Ajout patient</h1>
      </div>
        <div className="flex items-center mb-4 mt-8">
          <label className="w-2/5 text-right whitespace-nowrap">Prénom : </label>
          <input 
            type='text' required className="input-common" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} autoFocus/>
        </div>
      <div className="flex flex-col mb-2">
        <div className="flex items-center mb-2">
          <label className="w-2/5 text-right whitespace-nowrap">Nom : </label>
          <input 
            type='text' required className="input-common" 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}/>
        </div>
        <div className="flex items-center mb-2">
          <label className="w-2/5 text-right whitespace-nowrap">Numéro<br />d'assurance maladie : </label>
          <input type='text' required 
            className="input-common" 
            value={numAssu}
            onChange={(e) => setNumAssu(e.target.value)} />
        </div>
      </div>
      <div className="flex justify-center">
        <button className="h-11 pl-5 pr-5 bg-primary-light-blue outline-none rounded-full shadow-sm cursor-pointer text-base text-white font-semibold
          transform active:scale-95 transition duration-150 ease-in-out hover:bg-secondary-medium-blue disabled:bg-medium-gray"
          disabled={!isFormValid}
          onClick={handleAddPatient}>
          Ajouter patient
        </button>
      </div>
    </div>
  )
}

export default AddPatient;