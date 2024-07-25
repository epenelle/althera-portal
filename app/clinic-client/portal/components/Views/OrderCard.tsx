import React from 'react';
import { IoMdListBox } from 'react-icons/io';
import { MdLock } from 'react-icons/md';

type OrderCardProps = {
    id: string;
};

const OrderCard: React.FC<OrderCardProps> = ({ id }) => {
    const [edit, setedit] = React.useState(false);
    const nom = 'nom';
    const prenom = 'prenom';
    const numAttelle = 'numAttelle';

    return (
        <div className='flex justify-center pt-9 pb-9 bg-primary-dark-blue min-h-screen ml-[10vh] md:ml-[15vh]'>
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
                  value={nom}/>
                  {!edit && <MdLock size={20} className='ml-2' />}
                </div>
                <div className="flex items-center mb-2">
                  <label className="w-2/5 text-right whitespace-nowrap">Prénom : </label>
                  <input type='text' className="ml-4 h-12 border border-light-gray rounded-full text-base px-5" 
                  disabled={!edit}
                  value={prenom}/>
                  {!edit && <MdLock size={20} className='ml-2' />}
                </div>
                <div className="flex items-center mb-2">
                  <label className="w-2/5 text-right whitespace-nowrap">N° Attelle : </label>
                  <input type='text' className="ml-4 h-12 border border-light-gray rounded-full text-base px-5" 
                  disabled={!edit}
                  value={numAttelle}/>
                  {!edit && <MdLock size={20} className='ml-2' />}
                </div>
                <div className="flex items-center mb-2">
                  <label className="w-2/5 text-right whitespace-nowrap">Scan : </label>
                  <input type='text' className="ml-4 h-12 border border-light-gray rounded-full text-base px-5" disabled={!edit}/>
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
                    transform active:scale-95 transition duration-150 ease-in-out hover:bg-dark-red">
                        Supprimer la commande
                    </button>
                </div>
              </div>
            </div>
        </div>
    );
};

export default OrderCard;