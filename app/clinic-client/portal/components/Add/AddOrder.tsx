import React, { useEffect, useState } from 'react';
import Select, { GroupBase, components } from 'react-select';
import PopUp from '../Helper/PopUp';
import AddPatient from '../Add/AddPatient';
import { BsPeopleFill } from 'react-icons/bs';
import { addOrder } from '@/api/orders';
import { fetchPatients } from '@/api/patients';
import { Order, Patient } from '@/Constants/Types';
import Modal from 'react-modal';
import SelectModel from './SelectModel';
import SelectMeasures from './SelectMeasures';
import Confirm from './Confirm';

type AddOrderProps = {
  onClose: () => void;
  onOrderAdded: (order: Order) => void;
};

type PatientOption = {
  value: Patient;
  label: string;
};

const AddOrder: React.FC<AddOrderProps> = ({ onClose, onOrderAdded }) => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [typePopUp, setTypePopUp] = useState(false);
  const [messagePopUp, setMessagePopUp] = useState('');

  const [currentStep, setCurrentStep] = useState(0);
  const steps = [<SelectModel />, <SelectMeasures />, <Confirm />];

  const handleOk = () => {
    setIsPopUpVisible(false);
    onClose();
  };

  const handleCancel = () => setIsPopUpVisible(false);

  const showPopUp = (message: string, type: boolean) => {
    setMessagePopUp(message);
    setTypePopUp(type);
    setIsPopUpVisible(true);
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={false}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      className="relative bg-white rounded-lg p-6 mx-auto z-50 focus:outline-none w-3/4 h-3/4 flex flex-col"
    >
      <div className="relative mb-4 border-b-2 border-light-gray">
        <h1 className="text-2xl font-bold text-center">{['Modèle', 'Mesures', 'Confirmation'][currentStep]}</h1>
        <button
          onClick={() => showPopUp('Voulez-vous quitter la création de la commande ?', true)}
          className="absolute right-0 bottom-1 text-5xl font-bold hover:text-medium-red"
        >
          &times;
        </button>
      </div>
      <div className="flex-grow mb-4 overflow-auto">{steps[currentStep]}</div>
      <div className="flex justify-between mt-auto">
        <button
          onClick={() => setCurrentStep(currentStep - 1)}
          disabled={currentStep === 0}
          className="bg-gray-300 p-2 rounded"
        >
          Précédent
        </button>
        <button
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={currentStep === steps.length - 1}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Suivant
        </button>
      </div>
      {isPopUpVisible && <PopUp message={messagePopUp} type={typePopUp} onValider={handleOk} onCancel={handleCancel} />}
    </Modal>
  );
};

export default AddOrder;
