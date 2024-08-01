import { deleteById, fetchOrderById } from '@/api/orders';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { IoMdListBox } from 'react-icons/io';
import { MdLock } from 'react-icons/md';
import PopUp from '../Helper/PopUp';

type OrderCardProps = {
    id: string;
};

interface Patient {
	id?: number;
	firstName: string;
	lastName: string;
	healthInsuranceNumber: string;
	ClinicId?: string;
}

interface Order {
	id?: number;
	orthesisModel: string;
	orthesisComment: string;
	patientId?: number;
	orderDate?: string;
	orderState?: string;
	patient?: Patient;
}

const OrderCard: React.FC<OrderCardProps> = ({ id }) => {
  const router = useRouter();
  const [edit, setedit] = React.useState(false);
  const [isPopUpVisible, setIsPopUpVisible] = React.useState(false);
  const [typePopUp, setTypePopUp] = React.useState(false);
  const [messagePopUp, setMessagePopUp] = React.useState("");
    
  const [orderData, setOrderData] = React.useState<Order | null>(null);
  const [lastName, setLastName] = React.useState<string>("");
  const [firstName, setFirstName] = React.useState<string>("");
  const [orthesisModel, setOrthesisModel] = React.useState<string>("");
  const [orthesisComment, setOrthesisComment] = React.useState<string>("");  

  const fetchOrders = async () => {
    try {
      const data = await fetchOrderById(id);
      setOrderData(data);
      setLastName(data.patient?.lastName || "");
      setFirstName(data.patient?.firstName || "");
      setOrthesisModel(data.orthesisModel);
      setOrthesisComment(data.orthesisComment);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [id]);

  const handleDelete = async (orderId: string) => {
    try {
      const result = await deleteById(orderId);
      if (result) {
        showPopUp("La commande a bien été supprimée !", false)
      } else {
        showPopUp("La commande n'a pas pu être supprimée", false)
      }
    } catch (error) {
      showPopUp("Erreur lors la suppression de la commande.", false);
    }
  };

  const showPopUp = (message: string, type: boolean) => {
    setMessagePopUp(message);
    setTypePopUp(type);
    setIsPopUpVisible(true);
  };

  const handleOk = () => {
    setIsPopUpVisible(false);
    router.push('/Home?type=orders');
  };

  
  return (
    <div className='flex justify-center pt-9 pb-9 bg-primary-dark-blue min-h-screen ml-[10vh] md:ml-[15vh]'>
      {isPopUpVisible && (
        <PopUp
          message={messagePopUp}
          type={typePopUp}
          onOk={handleOk}
        />
      )}
      <div className='w-4/5 mt-4 md:mt-16 mx-auto p-6 bg-light-white rounded-lg shadow-md'>
        <div className='border-b-2 border-light-gray pb-4 flex items-center justify-center'>
          <IoMdListBox size={30} className='mr-2' />
          <h1 className='text-center font-bold text-3xl p-2 md:text-4x1 text-secondary-dark-blue '>Commande {id}</h1>
        </div>
        <div className="flex flex-col mb-4 mt-8">
          <div className="flex items-center mb-2">
            <label className="w-2/5 text-right whitespace-nowrap">Nom : </label>
            <input type='text' className="ml-4 h-12 border border-light-gray rounded-full text-base px-5" 
            disabled={!edit}
            value={lastName}/>
            {!edit && <MdLock size={20} className='ml-2' />}
          </div>
          <div className="flex items-center mb-2">
            <label className="w-2/5 text-right whitespace-nowrap">Prénom : </label>
            <input type='text' className="ml-4 h-12 border border-light-gray rounded-full text-base px-5" 
            disabled={!edit}
            value={firstName}/>
            {!edit && <MdLock size={20} className='ml-2' />}
          </div>
          <div className="flex items-center mb-2">
            <label className="w-2/5 text-right whitespace-nowrap">Modèle d'attelle : </label>
            <input type='text' className="ml-4 h-12 border border-light-gray rounded-full text-base px-5" 
            disabled={!edit}
            value={orthesisModel}/>
            {!edit && <MdLock size={20} className='ml-2' />}
          </div>
          <div className="flex items-center mb-2">
            <label className="w-2/5 text-right whitespace-nowrap">Informations Attelle : </label>
            <input type='text' className="ml-4 h-12 border border-light-gray rounded-full text-base px-5" 
            disabled={!edit}
            value={orthesisComment}/>
            {!edit && <MdLock size={20} className='ml-2' />}
          </div>
          <div className="flex justify-center mt-6">
            <button className="h-11 pl-5 pr-5 bg-secondary-light-blue border-2 border-black outline-none rounded-full shadow-sm cursor-pointer text-base text-white font-semibold
              transform active:scale-95 transition duration-150 ease-in-out hover:bg-secondary-medium-blue"
              onClick={() => setedit(!edit)}>
              Modifier les informations
            </button>
          </div>
          <div className="flex justify-center mt-6">
            <button className="h-11 pl-5 pr-5 bg-medium-red border-2 border-black outline-none rounded-full shadow-sm cursor-pointer text-base text-white font-semibold
              transform active:scale-95 transition duration-150 ease-in-out hover:bg-dark-red"
              onClick={() => handleDelete(id)}>
              Supprimer la commande
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;