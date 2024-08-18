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

  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [orthesisModel, setOrthesisModel] = useState<string>('');
  const [orthesisComment, setOrthesisComment] = useState<string>('');
  const [isAddPatientModalVisible, setIsAddPatientModalVisible] =
    useState(false);
  const isFormValid = selectedPatient && orthesisModel;
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const loadPatients = async () => {
      const patientsData = await fetchPatients();
      setPatients(patientsData);
    };
    loadPatients();
  }, []);

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

  const handleAddOrder = async () => {
    if (selectedPatient && orthesisModel) {
      const orderData = {
        patientId: selectedPatient.id,
        orthesisModel,
        orthesisComment,
      };
      try {
        const response = await addOrder(orderData);
        console.log(orderData);
        if (response.success) {
          showPopUp('Commande ajoutée avec succès.', false);
          if (response.order) {
            onOrderAdded(response.order);
          }
        }
      } catch (error) {
        showPopUp(
          "Une erreur est survenue lors de l'ajout de la commande.",
          false,
        );
      }
    }
  };

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

  const steps = [<SelectModel />, <SelectMeasures />, <Confirm />];

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={false}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      className="relative bg-white rounded-lg p-6 mx-auto z-50 focus:outline-none w-3/4 h-3/4"
    >
      <div className="relative mb-4 border-b-2 border-light-gray">
        <h1 className="text-2xl font-bold text-center">
          {['Modèle', 'Mesures', 'Confirmation'][currentStep]}
        </h1>
        <button
          onClick={() =>
            showPopUp('Voulez-vous quitter la création de la commande ?', true)
          }
          className="absolute right-0 bottom-1 text-5xl font-bold hover:text-medium-red"
        >
          &times;
        </button>
      </div>
      <div className="mb-4">{steps[currentStep]}</div>
      <div className="flex justify-between">
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
      {isPopUpVisible && (
        <PopUp
          message={messagePopUp}
          type={typePopUp}
          onValider={handleOk}
          onCancel={handleCancel}
        />
      )}
    </Modal>
  );
};

export default AddOrder;
