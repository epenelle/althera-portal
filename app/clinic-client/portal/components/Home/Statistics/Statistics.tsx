import React, { useState } from 'react'
import Modal from 'react-modal';
import { stats } from '@/Constants/Constants';
import StatisticsCard from './StatisticsCard';
import { IoBarChartOutline, IoAddCircleOutline } from 'react-icons/io5';
import AddOrder from '@/components/Add/AddOrder';

const Statistics = () => {
    const [isAddOrderModalVisible, setIsAddOrderModalVisible] = useState(false);
    const openAddOrderModal = () => setIsAddOrderModalVisible(true);
    const closeAddOrderModal = async () => {
        setIsAddOrderModalVisible(false);
    };

  return (
    <div className='ml-[10vh] md:ml-[15vh]'>
        <Modal
            isOpen={isAddOrderModalVisible}
            onRequestClose={closeAddOrderModal}
            overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            className="relative bg-white rounded-lg p-6 w-full max-w-lg mx-auto z-50 focus:outline-none"
        >
            <AddOrder onClose={closeAddOrderModal} />
        </Modal>
        <div className='w-4/5 mx-auto p-6 bg-light-white'>
            <div className='border-light-gray border-b-2 flex items-center justify-center pb-4'>
                <IoBarChartOutline size={30} className="mr-2" />
                <h1 className='text-secondary-dark-blue text-center font-bold md:text-4x1 p-2 text-3xl'>Accueil</h1>
            </div>
            <div className='grid-cols-1 grid gap-6 lg:grid-cols-3 md:grid-cols-2 mt-4 xl:grid-cols-3'>
            <button 
                className='bg-primary-dark-blue hover:bg-secondary-dark-blue text-light-white font-bold rounded-md'
                onClick={openAddOrderModal}>
                <IoAddCircleOutline className="inline-block mr-2" />
                Créer une commande
            </button>
            {stats.map((data)=>{
                return <div key={data.id}>
                    <StatisticsCard data={data}/>
                </div>
            })}
            </div>
        </div>
    </div>
  );
}

export default Statistics;