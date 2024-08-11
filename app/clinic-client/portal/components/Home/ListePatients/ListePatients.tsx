import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import PatientCard from '../ItemCard';
import { BsPeopleFill } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import PaginationMenu from '../../Helper/PaginationMenu';
import { useGlobalContext } from '@/components/Helper/GlobalContext';
import AddPatient from '@/components/Add/AddPatient';
import { Patient } from '@/Constants/Types';

if (typeof window !== 'undefined') {
    Modal.setAppElement(document.body);
}

const ListePatients = () => {
    {/* Patients recover*/}
    const { Patients, fetchPatients} = useGlobalContext();
    useEffect(() => {fetchPatients();}, []);

    {/* Modal system */}
    const [isAddOrderModalVisible, setIsAddOrderModalVisible] = useState(false);
    const openAddOrderModal = () => setIsAddOrderModalVisible(true);
    const closeAddOrderModal = async () => {
        fetchPatients();
        setDisplayedPatients(Patients);
        setIsAddOrderModalVisible(false);
    };

    {/* Search bar */}
    const [searchQuery, setSearchQuery] = useState('');
    const [displayedPatients, setDisplayedPatients] = useState<Patient[]>([]);
    useEffect(() => {
        setDisplayedPatients(Patients);
      }, [Patients]);

    useEffect(() => {
        handleSearch();
      }, [searchQuery]);
    
    const handleSearch = () => {
        if (!searchQuery) {
            setDisplayedPatients(Patients);
            return;
        }
        const searchTerms = searchQuery.toLowerCase().split(' ');
        const searchResults = Patients.filter(patient => 
            searchTerms.some(term =>
                `${patient.firstName} ${patient.lastName} (${patient.healthInsuranceNumber})`
                    .toLowerCase()
                    .includes(term)
            )
        );
        setDisplayedPatients(searchResults);
    };

      {/* Pagination system */}
    const [currentPage, setCurrentPage] = React.useState(1);
    const patientsPerPage = 10;
    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = displayedPatients.slice(indexOfFirstPatient, indexOfLastPatient);

    const totalPages = Math.ceil(displayedPatients.length / patientsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    const navigateToPage = (pageNumber: number): void => setCurrentPage(pageNumber);

    return (
        <div className='ml-[10vh] md:ml-[15vh]'>
            <Modal
                isOpen={isAddOrderModalVisible}
                onRequestClose={closeAddOrderModal}
                overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                className="relative bg-white rounded-lg p-6 w-full max-w-lg mx-auto z-50 focus:outline-none"
            >
                <AddPatient onClose={closeAddOrderModal} />
            </Modal>
            <div className='w-4/5 mx-auto p-6 bg-light-white '>
                <div className='border-b-2 border-light-gray pb-4 flex items-center justify-center'>
                    <BsPeopleFill size={30} className='mr-2' />
                    <h1 className='text-center font-bold text-3xl p-2 md:text-4x1 text-secondary-dark-blue '>Liste des patients</h1>
                </div>
                <div className='flex flex-col md:flex-row justify-center items-center w-full mt-4'>
                    <div className='flex flex-col md:flex-row justify-center items-center w-full p-2 border-2 border-light-gray rounded-lg'>
                        <input 
                        type='text' 
                        placeholder='Rechercher' 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='border-2 border-light-gray rounded-lg p-2 w-full' />
                    </div>
                    <button className='h-12 mt-4 mb-4  md:ml-5 bg-medium-green hover:bg-dark-green text-white font-bold py-2 px-4 transition duration-300 ease-in-out shadow-lg hover:shadow-xl rounded-lg'
                    onClick={openAddOrderModal}>
                        Ajouter
                    </button>
                </div>
                <div className='hidden md:grid md:grid-cols-[150px_160px_150px_40px] w-full items-center gap-4 mt-4 pl-24 mb-5 p-2 border-2 bg-light-gray border-medium-gray rounded-lg sm:gap-2 '>
                    <div className='flex items-center border-l-2 pl-3 border-r-2 border-medium-gray'>
                        <span className='font-bold text-lg'>Nom</span>
                    </div>
                    <div className='flex items-center border-r-2 border-medium-gray'>
                        <span className='font-bold text-lg'>Prénom</span>
                    </div>
                    <div className='flex items-center'>
                        <span className='font-bold text-lg'>N° assurance maladie</span>
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