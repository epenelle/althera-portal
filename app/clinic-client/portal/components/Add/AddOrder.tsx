import React from 'react';
import PopUp from '../Helper/PopUp';
import { BsPeopleFill } from 'react-icons/bs';
import { addOrder } from '@/api/orders';

type AddOrderProps = {
  onClose: () => void;
};

const AddOrder: React.FC<AddOrderProps> = ({ onClose }) => {
  const [isPopUpVisible, setIsPopUpVisible] = React.useState(false);
  const [typePopUp, setTypePopUp] = React.useState(false);
  const [messagePopUp, setMessagePopUp] = React.useState("");

  const [patientId, setPatientId] = React.useState<number>(1);
  const [orthesisModel, setOrthesisModel] = React.useState<string>("");
  const [orthesisComment, setOrthesisComment] = React.useState<string>("");
  const isFormValid = patientId && orthesisModel;

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
    try {
      const response = await addOrder({ patientId, orthesisModel, orthesisComment });
      if (response.success) {
        showPopUp("La commande a bien été ajoutée !", false);
      } else {
        showPopUp("Erreur lors de l'ajout de la commande.", true);
      }
    } catch (error) {
      showPopUp("Erreur lors de l'ajout de la commande.", true);
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
        <h1 className='text-center font-bold text-3xl p-2 md:text-4x1 text-secondary-dark-blue '>Ajout commande</h1>
      </div>
      <div className="flex flex-col mb-4 mt-8">
        <div className="flex items-center mb-2">
          <label className="w-2/5 text-right whitespace-nowrap">Patient id : </label>
          <input type='number' required className="ml-4 h-12 border border-light-gray rounded-full text-base px-5" 
          value={patientId}
          onChange={(e) => setPatientId(parseInt(e.target.value))} autoFocus/>
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
            target.style.height = `${target.scrollHeight}px`;
          }} 
          value={orthesisComment}
          onChange={(e) => setOrthesisComment(e.target.value)}/>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="h-11 pl-5 pr-5 bg-primary-light-blue outline-none rounded-full shadow-sm cursor-pointer text-base text-white font-semibold
        transform active:scale-95 transition duration-150 ease-in-out hover:bg-secondary-medium-blue disabled:bg-medium-gray"
        disabled={!isFormValid}
        onClick={handleAddOrder}>
          Ajouter la commande
        </button>
      </div>
    </div>
  );
};

export default AddOrder;