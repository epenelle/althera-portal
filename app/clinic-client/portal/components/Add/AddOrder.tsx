import React, { useEffect, useState } from 'react';
import Select, { GroupBase, components } from 'react-select';
import PopUp from '../Helper/PopUp';
import AddPatient from '../Add/AddPatient';
import { BsPeopleFill } from 'react-icons/bs';
import { addOrder } from '@/api/orders';
import { fetchPatients } from '@/api/patients';
import { Order, Patient } from '@/Constants/Types';
import Modal from 'react-modal';

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
  const [messagePopUp, setMessagePopUp] = useState("");

  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [orthesisModel, setOrthesisModel] = useState<string>("");
  const [orthesisComment, setOrthesisComment] = useState<string>("");
  const [isAddPatientModalVisible, setIsAddPatientModalVisible] = useState(false);
  const isFormValid = selectedPatient && orthesisModel;

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
        if(response.success) {
          showPopUp("Commande ajoutée avec succès.", false);
          if (response.order) {
            onOrderAdded(response.order);
          }
        }
      } catch (error) {
        showPopUp("Une erreur est survenue lors de l'ajout de la commande.", false);
      }
    }
  };

  const patientOptions: GroupBase<PatientOption>[] = [
    {
      options: patients.map(patient => ({
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
    <div>
      {isPopUpVisible && (
        <PopUp
          message={messagePopUp}
          type={typePopUp}
          onOk={handleOk}
          onCancel={handleCancel}
        />
      )}
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
      <div className='border-b-2 border-light-gray pb-4 flex items-center justify-center'>
        <BsPeopleFill size={30} className='mr-2' />
        <h1 className='text-center font-bold text-3xl p-2 md:text-4x1 text-secondary-dark-blue '>Ajout commande</h1>
      </div>
      <div className="flex flex-col mb-4 mt-8">
        <div className="flex items-center mb-2">
          <label className="w-2/5 text-right whitespace-nowrap">Patient : </label>
          <Select
            className="ml-4 w-3/5"
            options={patientOptions}
            value={selectedPatient ? { value: selectedPatient, label: `${selectedPatient.firstName} ${selectedPatient.lastName}` } : null}
            onChange={handlePatientChange}
            placeholder="Sélectionner un patient"
            components={{ MenuList }}
          />
        </div>
        <div className="flex items-center mb-2">
          <label className="w-2/5 text-right whitespace-nowrap">Modèle d'attelle </label>
          <input
            type='text'
            required 
            className="input-common" 
          value={orthesisModel}
          onChange={(e) => setOrthesisModel(e.target.value)}/>
        </div>
        <div className="flex items-center mb-2">
          <label className="w-2/5 text-right whitespace-nowrap">Infos attelle </label>
          <textarea required className="w-56 ml-4 h-12 border border-light-gray text-base px-5 resize-none overflow-hidden" rows={1} onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
          }} value={orthesisComment} onChange={(e) => setOrthesisComment(e.target.value)} />
        </div>
        <button onClick={handleAddOrder} disabled={!isFormValid} className="mt-4 bg-blue-500 text-white p-2 rounded-full">Ajouter la commande</button>
      </div>
    </div>
  );
};

export default AddOrder;