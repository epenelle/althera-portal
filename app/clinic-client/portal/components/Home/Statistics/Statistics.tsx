import React, { useState } from 'react';
import { stats } from '@/Constants/Constants';
import Modal from 'react-modal';
import StatisticsCard from './StatisticsCard';
import { IoBarChartOutline, IoAddCircleOutline } from 'react-icons/io5';
import { Order, Patient } from '@/Constants/Types';
import { useRouter } from 'next/router';
import AddOrder from '@/components/Add/AddOrder';
import AddPatient from '@/components/Add/AddPatient';

const Statistics = () => {
  {
    /* Modal system */
  }
  const [isAddOrderModalOpen, setAddOrderModalOpen] = useState(false);
  const [isAddPatientModalOpen, setAddPatientModalOpen] = useState(false);

  const openAddOrderModal = () => setAddOrderModalOpen(true);
  const closeAddOrderModal = () => setAddOrderModalOpen(false);

  const openAddPatientModal = () => setAddPatientModalOpen(true);
  const closeAddPatientModal = () => setAddPatientModalOpen(false);

  const router = useRouter();
  const handleAddPatient = (newPatient: Patient) => {
    router.push(`/View?type=patient&num=${newPatient.id}`);
  };
  const handleAddOrder = (newOrder: Order) => {
    router.push(`/View?type=order&num=${newOrder.id}`);
  };

  return (
    <div className="ml-[10vh] md:ml-[15vh]">
      <Modal
        isOpen={isAddOrderModalOpen || isAddPatientModalOpen}
        onRequestClose={closeAddOrderModal || closeAddPatientModal}
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        className="relative bg-white rounded-lg p-6 w-full max-w-lg mx-auto z-50 focus:outline-none"
      >
        {isAddOrderModalOpen && <AddOrder onClose={closeAddOrderModal} onOrderAdded={handleAddOrder} />}
        {isAddPatientModalOpen && <AddPatient onClose={closeAddPatientModal} onPatientAdded={handleAddPatient} />}
      </Modal>
      <div className="w-4/5 mx-auto p-6 bg-light-white">
        <div className="border-light-gray border-b-2 flex items-center justify-center pb-4">
          <IoBarChartOutline size={30} className="mr-2" />
          <h1 className="text-secondary-dark-blue text-center font-bold md:text-4x1 p-2 text-3xl">Accueil</h1>
        </div>
        <div className="grid-cols-1 grid gap-6 lg:grid-cols-3 md:grid-cols-2 mt-4 xl:grid-cols-3">
          <button
            className="bg-primary-dark-blue hover:bg-secondary-dark-blue text-light-white font-bold rounded-md"
            onClick={openAddOrderModal}
          >
            <IoAddCircleOutline className="inline-block mr-2" />
            Créer une commande
          </button>
          {stats.map((data) => {
            return (
              <div key={data.id}>
                <StatisticsCard data={data} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
