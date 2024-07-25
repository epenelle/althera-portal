import React from 'react'
import PopUp from '../Helper/PopUp';
import { BsPeopleFill } from 'react-icons/bs';
import { useRouter } from 'next/router';

const AddPatient = () => {
  const router = useRouter();
  const [isPopUpVisible, setIsPopUpVisible] = React.useState(false);
  const [typePopUp, setTypePopUp] = React.useState(false);
  const [messagePopUp, setMessagePopUp] = React.useState("");

    const handleOk = () => {
        setIsPopUpVisible(false);
        router.push('/Home?type=patients');
    };

    const handleCancel = () => {
        setIsPopUpVisible(false);
    };

    const showPopUp = (message: string, type: boolean) => {
        setMessagePopUp(message);
        setTypePopUp(type);
        setIsPopUpVisible(true);
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
      <div className='flex justify-center pt-9 pb-9 bg-primary-dark-blue min-h-screen ml-[10vh] md:ml-[15vh]'>
        <div className='w-4/5 mt-4 md:mt-16 mx-auto p-6 bg-light-white rounded-lg shadow-md'>
          <div className='border-b-2 border-light-gray pb-4 flex items-center justify-center'>
            <BsPeopleFill size={30} className='mr-2' />
            <h1 className='text-center font-bold text-3xl p-2 md:text-4x1 text-secondary-dark-blue '>Ajout patient</h1>
          </div>
          <div className="flex flex-col mb-4 mt-8">
            <div className="flex items-center mb-2">
              <label className="w-2/5 text-right whitespace-nowrap">Nom : </label>
              <input type='text' required className="ml-4 h-12 border border-light-gray rounded-full text-base px-5" />
            </div>
            <div className="flex items-center mb-2">
              <label className="w-2/5 text-right whitespace-nowrap">Prénom : </label>
              <input type='text' required className="ml-4 h-12 border border-light-gray rounded-full text-base px-5" />
            </div>
            <div className="flex items-center mb-2">
              <label className="w-2/5 text-right whitespace-nowrap">Numéro de <br /> sécurité sociale : </label>
              <input type='text' required className="ml-4 h-12 border border-light-gray rounded-full text-base px-5" />
            </div>
          </div>
          <div className="flex justify-center">
            <button className="h-11 pl-5 pr-5 bg-medium-red border-2 border-black outline-none rounded-full shadow-sm cursor-pointer text-base text-white font-semibold
            transform active:scale-95 transition duration-150 ease-in-out hover:bg-dark-red"
            onClick={() => showPopUp("Le patient a bien été ajouté !", false)}>
              Ajouter patient
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPatient;