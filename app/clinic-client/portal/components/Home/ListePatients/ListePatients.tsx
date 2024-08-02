import React, { useEffect } from 'react';
import PatientCard from '../ItemCard';
import { BsPeopleFill } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import PaginationMenu from '../../Helper/PaginationMenu';
import { useRouter } from 'next/router';
import { useGlobalContext } from '@/components/Helper/GlobalContext';

const ListePatients = () => {
    const router = useRouter();
    const { patients, fetchPatients } = useGlobalContext();

    useEffect(() => {
        fetchPatients();
    }, []);

    const [currentPage, setCurrentPage] = React.useState(1);
    const patientsPerPage = 10;
    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);

    const totalPages = Math.ceil(patients.length / patientsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    const navigateToPage = (pageNumber: number): void => {
      setCurrentPage(pageNumber);
    };

    const handleAddPatientClick = () => {
      router.push('/Add?type=patient');
    };

    return (
        <div className='flex justify-center pt-9 pb-9 bg-primary-dark-blue min-h-screen ml-[10vh] md:ml-[15vh]'>
            <div className='w-4/5 mt-8 md:mt-16 mx-auto p-6 bg-light-white rounded-lg shadow-md'>
                <div className='border-b-2 border-light-gray pb-4 flex items-center justify-center'>
                    <BsPeopleFill size={30} className='mr-2' />
                    <h1 className='text-center font-bold text-3xl p-2 md:text-4x1 text-secondary-dark-blue '>Liste des patients</h1>
                </div>
                <div className='flex flex-col md:flex-row justify-center items-center w-full mt-4'>
                    <div className='flex flex-col md:flex-row justify-center items-center w-full p-2 border-2 border-light-grayrounded-lg'>
                        <input type='text' placeholder='Search, add a comma (,) between each searched value' className='border-2 border-light-gray rounded-lg p-2 w-full' />
                        <FaSearch size={30} className='mt-4 md:mt-0 md:ml-2 shrink-0 self-center cursor-pointer hover:text-secondary-medium-blue' />
                    </div>
                    <button className='h-12 mt-4 mb-4  md:ml-5 bg-medium-green hover:bg-dark-green text-white font-bold py-2 px-4 transition duration-300 ease-in-out shadow-lg hover:shadow-xl rounded-lg'
                    onClick={handleAddPatientClick}>
                        Ajouter
                    </button>
                </div>
                <div className='hidden md:grid md:grid-cols-[150px_160px_150px_40px] w-full items-center gap-4 mt-4 pl-24 mb-5 p-2 border-2 bg-light-gray border-medium-gray rounded-lg sm:gap-2 '>
                    <div className='flex items-center border-l-2 pl-3 border-r-2 border-medium-gray'>
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
                    <div className='flex items-center'>
                        <span className='font-bold text-lg'>N° assurance maladie</span>
                        <div className='grid grid-rows-[5px_5px] mb-2 ml-2'>
                            <FaSortUp className='cursor-pointer' />
                            <FaSortDown className='cursor-pointer' />
                        </div>
                    </div>
                </div>
                {currentPatients.map((patient) => (
                    <PatientCard key={patient.id} data={patient} />
                ))}
                <PaginationMenu currentPage={currentPage} totalPages={totalPages} navigateToPage={navigateToPage} />
            </div>
        </div>
    );
}

export default ListePatients;