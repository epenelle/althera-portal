import React from 'react'
import { PatientsData } from '@/data/data';
import CommandeCard from './CommandeCard';
import { IoBarChartOutline } from 'react-icons/io5';
import { BsPeopleFill } from 'react-icons/bs';

const ListeCommandes = () => {
  return (
    <div className='flex justify-center pt-9 pb-9 bg-[#00072D] min-h-screen ml-[10vh] md:ml-[15vh]'>
        <div className='w-4/5 mt-8 md:mt-16 mx-auto p-6 bg-[#FFFFFF] rounded-lg shadow-md'>
            <div className='border-b-2 border-gray-200 pb-4 flex items-center justify-center'>
                <BsPeopleFill size={30} className="mr-2" />
                <h1 className='text-center font-bold text-3xl p-2 md:text-4x1 text-blue-950 '>Liste des Commandes</h1>
            </div>
            <div className='grid grid-cols-1 gap-6 mt-4'>
            {PatientsData.map((data)=>{
                return <div key={data.id}>
                    {/*<CommandeCard data={data}/>*/}
                </div>
            })}
            </div>
        </div>
    </div>
  );
}

export default ListeCommandes;