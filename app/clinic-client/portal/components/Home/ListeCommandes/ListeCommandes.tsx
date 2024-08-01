import React, { useState, useEffect, useRef, useContext } from 'react';
import ItemCard from '../ItemCard';
import { BsPeopleFill } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import SelectCalendrier from '@/components/Helper/Calendrier';
import PaginationMenu from '../../Helper/PaginationMenu';
import { useRouter } from 'next/router';
import { useGlobalContext } from '@/components/Helper/GlobalContext';




const ListePatients = () => {
  const router = useRouter();
  const { orders, fetchOrders } = useGlobalContext();

    useEffect(() => {
        fetchOrders();
    }, []);
  const [currentPage, setCurrentPage] = React.useState(1);
  const ordersPerPage = 10;
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const navigateToPage = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  const handleAddOrderClick = () => {
    router.push('/Add?type=order');
  };

return (
        <div className='flex justify-center pt-9 pb-9 bg-primary-dark-blue min-h-screen ml-[10vh] md:ml-[15vh]'>
            <div className='w-4/5 mt-8 md:mt-16 mx-auto p-6 bg-light-white rounded-lg shadow-md'>
                <div className='border-b-2 border-light-gray pb-4 flex items-center justify-center'>
                    <BsPeopleFill size={30} className='mr-2' />
                    <h1 className='text-center font-bold text-3xl p-2 md:text-4x1 text-secondary-dark-blue '>Liste des commandes</h1>
                </div>
                <div className='flex flex-col md:flex-row justify-center items-center w-full mt-4'>
                    <div className='flex flex-col md:flex-row justify-center items-center w-full p-2 border-2 border-light-gray rounded-lg'>
                        <input type='text' placeholder='Search, add a comma (,) between each searched value' className='border-2 border-light-gray rounded-lg p-2 w-full' />
                        <FaSearch size={30} className='mt-4 md:mt-0 md:ml-2 shrink-0 self-center cursor-pointer hover:text-secondary-medium-blue' />
                    </div>
                    <button className='h-12 mt-4 mb-4  md:ml-5 bg-medium-green hover:bg-dark-green text-white font-bold py-2 px-4 transition duration-300 ease-in-out shadow-lg hover:shadow-xl rounded-lg'
                    onClick={handleAddOrderClick}>
                        Ajouter
                    </button>
                </div>
                <div className='hidden md:grid md:grid-cols-[160px_150px_140px_130px_150px] w-full items-center gap-4 pl-28 mt-4 p-2 border-2 bg-light-gray border-medium-gray rounded-lg mb-5'>
                    <div className='flex items-center border-l-2 pl-3 border-r-2 border-medium-gray'>
                        <span className='font-bold text-lg'>Numéro</span>
                        <div className='grid grid-rows-[5px_5px] mb-2 ml-2'>
                            <FaSortUp className='cursor-pointer' />
                            <FaSortDown className='cursor-pointer' />
                        </div>
                    </div>
                    <div className='flex items-center border-r-2 border-medium-gray'>
                        <span className='font-bold text-lg'>Nom</span>
                        <div className='grid grid-rows-[5px_5px] mb-2 ml-2'>
                            <FaSortUp className='cursor-pointer' />
                            <FaSortDown className='cursor-pointer' />
                        </div>
                    </div>
                    <div className='flex items-center border-r-2 border-medium-gray'>
                        <span className='font-bold text-lg'>Prénom</span>
                        <div className='grid grid-rows-[5px_5px] mb-2 ml-2'>
                            <FaSortUp className='cursor-pointer' />
                            <FaSortDown className='cursor-pointer' />
                        </div>
                    </div>
                    <div className='flex items-center border-r-2 border-medium-gray'>
                        <span className='font-bold text-lg'>Date</span>
                        <div className='pt-2 mb-2 ml-2'>
                            <FaSortDown className='cursor-pointer' />
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <span className='font-bold text-lg'>Status</span>
                        <div className='grid grid-rows-[5px_5px] mb-2 ml-2'>
                            <FaSortUp className='cursor-pointer' />
                            <FaSortDown className='cursor-pointer' />
                        </div>
                    </div>
                </div>
                {currentOrders.map((order) => (
                    <ItemCard key={order.id} data={order} />
                ))}
                <PaginationMenu currentPage={currentPage} totalPages={totalPages} navigateToPage={navigateToPage} />
                {/*<SelectCalendrier />*/}
            </div>
        </div>
);
}

export default ListePatients;