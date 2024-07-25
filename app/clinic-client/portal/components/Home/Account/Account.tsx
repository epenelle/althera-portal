import React, { useState } from 'react'
import { MdAccountCircle } from 'react-icons/md';
import ModifAccount from './ModifAccount';
import ModifPass from './ModifPass';

const Account = () => {
  const [activeSection, setActiveSection] = useState('modifCompte');

  const handleSectionClick = (section: string): void => {
    setActiveSection(section);
  }

  return (
    <div className='flex flex-col justify-center pt-9 pb-9 bg-dark-blue min-h-screen ml-[10vh] md:ml-[15vh]'>
        <div className='flex flex-col grow w-4/5 mt-8 md:mt-16 mx-auto p-6 bg-light-white shadow-md rounded-lg justify-center'>
            <div className='pb-4 flex items-center justify-center'>
                <MdAccountCircle size={30} className='mr-2' />
                <h1 className='text-center font-bold text-3xl p-2 md:text-4x1 text-secondary-dark-blue '>Gestion du compte</h1>
            </div>
            <div className='flex justify-between mt-4'>
                <div className={`w-1/2 text-center py-2 border-2 border-light-gray rounded-lg cursor-pointer ${activeSection === 'modifCompte' ? 'bg-primary-light-blue' : 'hover:bg-gray-100'} transition duration-300 ease-in-out mr-2`}
                     onClick={() => handleSectionClick('modifCompte')}>
                        Modification des coordonnées
                </div>
                <div className={`w-1/2 text-center py-2 border-2 border-light-gray rounded-lg cursor-pointer ${activeSection === 'modifPass' ? 'bg-primary-light-blue' : 'hover:bg-gray-100'} transition duration-300 ease-in-out ml-2`}
                     onClick={() => handleSectionClick('modifPass')}>
                        Modification du mot de passe
                </div>
            </div>
            <div className='flex grow justify-center items-center'>
                {activeSection === 'modifCompte' && <ModifAccount/>}
                {activeSection === 'modifPass' && <ModifPass />}
            </div>
        </div>
    </div>
  )
}

export default Account;