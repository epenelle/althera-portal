import React from 'react'
import { PatientsData } from '@/data/data';
import PatientCard from './PatientCard';
import { BsPeopleFill } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import SelectCalendrier from '@/components/Helper/Calendrier';
import PaginationMenu from '../../Helper/PaginationMenu';




const ListePatients = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const patientsPerPage = 10;
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = PatientsData.slice(indexOfFirstPatient, indexOfLastPatient);

  const totalPages = Math.ceil(PatientsData.length / patientsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const navigateToPage = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

return (
    <div className='flex justify-center pt-9 pb-9 bg-[#00072D] min-h-screen ml-[10vh] md:ml-[15vh]'>
        <div className='w-4/5 mt-8 md:mt-16 mx-auto p-6 bg-[#FFFFFF] rounded-lg shadow-md'>
            <div className='border-b-2 border-gray-200 pb-4 flex items-center justify-center'>
                <BsPeopleFill size={30} className='mr-2' />
                <h1 className='text-center font-bold text-3xl p-2 md:text-4x1 text-blue-950 '>Liste des patients</h1>
            </div>
            <div className='flex flex-col md:flex-row justify-center items-center w-full mt-4'>
                <div className='flex flex-col md:flex-row justify-center items-center w-full p-2 border-2 border-gray-300 rounded-lg'>
                    <input type='text' placeholder='Search, add a comma (,) between each searched value' className='border-2 border-gray-300 rounded-lg p-2 w-full' />
                    <FaSearch size={30} className='mt-4 md:mt-0 md:ml-2 shrink-0 self-center' />
                </div>
                <button className='h-12 mt-4 mb-4  md:ml-5 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 transition duration-300 ease-in-out shadow-lg hover:shadow-xl rounded-lg'>
                    Ajouter
                </button>
            </div>
            <div className='hidden md:grid md:grid-cols-[150px_160px_150px_40px] w-full items-center gap-4 mt-4 p-2 border-2 bg-gray-300 border-gray-400 rounded-lg mb-5'>
                <div className='flex items-center border-l-2 pl-3 border-r-2 border-gray-400'>
                    <span className='font-bold text-lg'>Nom</span>
                    <div className='grid grid-rows-[5px_5px] mb-2 ml-2'>
                        <FaSortUp className='cursor-pointer' />
                        <FaSortDown className='cursor-pointer' />
                    </div>
                </div>
                <div className='flex items-center border-r-2 border-gray-400'>
                    <span className='font-bold text-lg'>Prénom</span>
                    <div className='grid grid-rows-[5px_5px] mb-2 ml-2'>
                        <FaSortUp className='cursor-pointer' />
                        <FaSortDown className='cursor-pointer' />
                    </div>
                </div>
                <div className='flex items-center'>
                    <span className='font-bold text-lg'>Num sécu</span>
                    <div className='grid grid-rows-[5px_5px] mb-2 ml-2'>
                        <FaSortUp className='cursor-pointer' />
                        <FaSortDown className='cursor-pointer' />
                    </div>
                </div>
            </div>
            {currentPatients.map((patient) => (
                <PatientCard key={patient.id} patient={patient} />
            ))}
            <PaginationMenu currentPage={currentPage} totalPages={totalPages} navigateToPage={navigateToPage} />
            {/*<SelectCalendrier />*/}
        </div>
    </div>
);
}

export default ListePatients;