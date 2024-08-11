import React, { useEffect, useState } from 'react';
import Select, { GroupBase } from 'react-select';
import PopUp from '../Helper/PopUp';
import { BsPeopleFill } from 'react-icons/bs';
import { addOrder } from '@/api/orders';
import { fetchPatients } from '@/api/patients';
import { Patient } from '@/Constants/Types';

type AddOrderProps = {
  onClose: () => void;
};

type PatientOption = {
  value?: Patient;
  label?: string;
};


const AddOrder: React.FC<AddOrderProps> = ({ onClose }) => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [typePopUp, setTypePopUp] = useState(false);
  const [messagePopUp, setMessagePopUp] = useState("");

  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [orthesisModel, setOrthesisModel] = useState<string>("");
  const [orthesisComment, setOrthesisComment] = useState<string>("");
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
        patientId: selectedPatient.value.id,
        orthesisModel,
        orthesisComment,
      };
      try {
        await addOrder(orderData);
        setMessagePopUp("Commande ajoutée avec succès.");
        setTypePopUp(false);
        setIsPopUpVisible(true);
      } catch (error) {
        setMessagePopUp(
          "Une erreur est survenue lors de l'ajout de la commande."
        );
        setTypePopUp(false);
        setIsPopUpVisible(true);
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
        <h1 className='text-center font-bold text-3xl p-2 md:text-4x1 text-secondary-dark-blue '>Ajout commande</h1>
      </div>
      <div className="flex flex-col mb-4 mt-8">
        <div className="flex items-center mb-2">
          <label className="w-2/5 text-right whitespace-nowrap">Patient : </label>
          <Select
            className="ml-4 w-3/5"
            options={patientOptions as unknown as readonly (Patient | GroupBase<Patient>)[]}
            value={selectedPatient}
            onChange={setSelectedPatient}
            placeholder="Sélectionner un patient"
          />
        </div>
        <div className="flex items-center mb-2">
          <label className="w-2/5 text-right whitespace-nowrap">Modèle d'attelle : </label>
          <input type='text' required className="ml-4 h-12 border border-light-gray rounded-full text-base px-5" 
          value={orthesisModel}
          onChange={(e) => setOrthesisModel(e.target.value)}/>
        </div>
        <div className="flex items-center mb-2">
          <label className="w-2/5 text-right whitespace-nowrap">Infos attelle : </label>
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