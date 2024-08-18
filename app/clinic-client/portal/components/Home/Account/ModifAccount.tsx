import React from 'react';
import PopUp from '../../Helper/PopUp';
import { useRouter } from 'next/router';

const ModifAccount = () => {
  const router = useRouter();
  const defaultNomClinique = 'Clinique Sherbrooke';
  const defaultAdresse = 'Sherbrooke';
  const defaultTelephone = '01 23 45 67 89';
  const defaultEmail = 'clinique@sherbrooke.com';

  const [isPopUpVisible, setIsPopUpVisible] = React.useState(false);
  const [typePopUp, setTypePopUp] = React.useState(false);
  const [messagePopUp, setMessagePopUp] = React.useState('');

  const handleOk = () => {
    setIsPopUpVisible(false);
    router.push('/Home?type=dashboard');
  };

  const showPopUp = (message: string, type: boolean) => {
    setMessagePopUp(message);
    setTypePopUp(type);
    setIsPopUpVisible(true);
  };

  return (
    <div className="rounded-lg w-3/4 p-8 border-2 border-light-grayshadow-lg flex flex-col items-center">
      {isPopUpVisible && (
        <PopUp message={messagePopUp} type={typePopUp} onOk={handleOk} />
      )}
      <h1 className="text-center font-bold text-2xl p-2 md:text-4x1 text-secondary-dark-blue mb-4">
        Modification des coordonnées
      </h1>
      <div className="w-full max-w-md">
        <div className="flex flex-col mb-4">
          <div className="flex items-center mb-2">
            <label className="w-1/3 text-right whitespace-nowrap">
              Nom clinique :{' '}
            </label>
            <input
              type="text"
              placeholder={defaultNomClinique}
              className="ml-4 flex-1 h-12 border border-light-gray rounded-full text-base px-5"
            />
          </div>
          <div className="flex items-center mb-2">
            <label className="w-1/3 text-right whitespace-nowrap">
              Adresse postale :{' '}
            </label>
            <input
              type="text"
              placeholder={defaultAdresse}
              className="ml-4 flex-1 h-12 border border-light-gray rounded-full text-base px-5"
            />
          </div>
          <div className="flex items-center mb-2">
            <label className="w-1/3 text-right whitespace-nowrap flex justify-end">
              Numéro de téléphone :{' '}
            </label>
            <input
              type="text"
              placeholder={defaultTelephone}
              className="ml-4 flex-1 h-12 border border-light-gray rounded-full text-base px-5"
            />
          </div>
          <div className="flex items-center mb-2">
            <label className="w-1/3 text-right whitespace-nowrap">
              Email :{' '}
            </label>
            <input
              type="email"
              placeholder={defaultEmail}
              className="ml-4 flex-1 h-12 border border-light-gray rounded-full text-base px-5"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="h-11 pl-5 pr-5 bg-medium-red border-2 border-black outline-none rounded-full shadow-sm cursor-pointer text-base text-white font-semibold
          transform active:scale-95 transition duration-150 ease-in-out hover:bg-dark-red"
            onClick={() =>
              showPopUp('Les modifications ont bien été enregistrées !', false)
            }
          >
            Enregistrer les modifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModifAccount;
