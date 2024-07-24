'use client';
import React from 'react'
import PopUp from '../../Helper/PopUp';
import { useButtonContext } from '@/components/Helper/ButtonContext';

const ModifPass = () => {
    const [isPopUpVisible, setIsPopUpVisible] = React.useState(false);
    const [typePopUp, setTypePopUp] = React.useState(false);
    const [messagePopUp, setMessagePopUp] = React.useState("");
    const { buttonValue, setButtonValue } = useButtonContext();

    const handleOk = () => {
        setIsPopUpVisible(false);
        setButtonValue(1);
    };
    const handleValider = () => {
        setIsPopUpVisible(false);
        showPopUp("La demande a bien été envoyé", false);
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
    <div className='flex-row w-3/4'>
        {isPopUpVisible && (
            <PopUp
                message={messagePopUp}
                type={typePopUp}
                onOk={handleOk}
                onCancel={handleCancel}
                onValider={handleValider}
            />
        )}
      <div className="rounded-lg p-8 border-2 border-gray-200 shadow-lg flex flex-col items-center">
        <h1 className='text-center font-bold text-2xl p-2 md:text-4x1 text-blue-950 mb-4'>Modification des coordonnées</h1>
        <div className="w-full max-w-lg">
          <div className="flex flex-col mb-4">
            <div className="flex items-center mb-2">
              <label className="w-2/5 text-right whitespace-nowrap">Ancien mot de passe : </label>
              <input type='password' className="ml-4 h-12 border border-gray-200 rounded-full text-base px-5" />
            </div>
            <div className="flex items-center mb-2">
              <label className="w-2/5 text-right whitespace-nowrap">Nouveau mot de passe : </label>
              <input type='password' className="ml-4 h-12 border border-gray-200 rounded-full text-base px-5" />
            </div>
            <div className="flex items-center mb-2">
              <label className="w-2/5 text-right whitespace-nowrap">Confirmer le mot de passe : </label>
              <input type='password' className="ml-4 h-12 border border-gray-200 rounded-full text-base px-5" />
            </div>
          </div>
          <div className="flex justify-center">
            <button className="h-11 pl-5 pr-5 bg-red-600 border-2 border-black outline-none rounded-full shadow-sm cursor-pointer text-base text-white font-semibold
            transform active:scale-95 transition duration-150 ease-in-out"
            onClick={() => showPopUp("Le mot de passe à bien été modifié !", false)}>
              Modifier le mot de passe
            </button>
          </div>
        </div>
      </div>
      <div className="mt-20 flex justify-center">
        <button className="h-11 px-5 bg-red-600 border-2 border-black shadow-sm rounded-full text-white underline font-semibold cursor-pointer
        transform active:scale-95 transition duration-150 ease-in-out"
        onClick={() => showPopUp("Confirmer la suppression du compte et de ses données", true)}>
          Demander la suppression du compte
        </button>
      </div>
    </div>
  )
}

export default ModifPass;