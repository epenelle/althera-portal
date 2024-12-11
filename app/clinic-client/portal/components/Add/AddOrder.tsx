import React, { useEffect, useState } from 'react';
import Select, { GroupBase, components } from 'react-select';
import PopUp from '../Helper/PopUp';
import AddPatient from '../Add/AddPatient';
import { BsPeopleFill } from 'react-icons/bs';
import { addOrder } from '@/api/orders';
import { fetchPatients } from '@/api/patients';
import { Order, Patient, PopUpVariant } from '@/Constants/Types';
import Modal from 'react-modal';
import SelectModel from './AddOrderPages/SelectModel';
import SelectMeasures from './AddOrderPages/SelectMeasures';
import Confirm from './AddOrderPages/Confirm';
import { OrderProvider } from '@/components/Helper/OrderContext';
import AddOrderPagination from '@/components/Helper/AddOrderPagination';

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
  const [typePopUp, setTypePopUp] = useState<PopUpVariant>('default');
  const [messagePopUp, setMessagePopUp] = useState('');

  const [currentStep, setCurrentStep] = useState(0);
  const steps = [<SelectModel key="select-model"/>, <SelectMeasures key="select-measures"/>, <Confirm key="confirm"/>];

  const handleValider = () => {
    setIsPopUpVisible(false);
    onClose();
  };

  const handleCancel = () => setIsPopUpVisible(false);

  const showPopUp = (message: string, type: PopUpVariant) => {
    setMessagePopUp(message);
    setTypePopUp(type);
    setIsPopUpVisible(true);
  };

  return (
    <OrderProvider>
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
            onClick={() => showPopUp('Voulez-vous quitter la création de la commande ?', 'exit')}
            className="absolute right-0 bottom-1 text-5xl font-bold hover:text-medium-red"
          >
            &times;
          </button>
        </div>
        <div className="flex-grow mb-4 overflow-auto">{steps[currentStep]}</div>

        <AddOrderPagination
          currentStep={currentStep}
          totalSteps={steps.length}
          onPrevious={() => setCurrentStep(currentStep - 1)}
          onNext={() => setCurrentStep(currentStep + 1)}
          onOrder={() => {
            showPopUp('Commande créée avec succès', 'default');
          }}
        />

        {isPopUpVisible && (
          <PopUp
            message={messagePopUp}
            variant={typePopUp}
            onQuitter={onClose}
            onCancel={handleCancel}
            onOk={handleValider}
          />
        )}
      </Modal>
    </OrderProvider>
  );
};

export default AddOrder;
