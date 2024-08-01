import React, { useEffect, useState } from 'react';
import { MdLock, MdPerson } from 'react-icons/md';
import ItemCard from '../Home/ItemCard';
import { fetchPatientById } from '@/api/patients';
import { fetchOrdersByIdPatient } from '@/api/orders';

type PatientCardProps = {
  id: string;
};

interface Patient {
  id?: number;
  firstName: string;
  lastName: string;
  healthInsuranceNumber: string;
  idClinique?: string;
}

interface Order {
	id?: number;
	orthesisModel: string;
	orthesisComment: string;
	patientId?: number;
	orderDate?: string;
	orderState?: string;
	patient?: Patient;
}

const PatientCard: React.FC<PatientCardProps> = ({ id }) => {
  const [edit, setEdit] = useState(false);
  const [patientData, setPatientData] = useState<Patient | null>(null);
  const [ orders, setOrders ] = useState<Order[]>([]);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [healthInsuranceNumber, setHealthInsuranceNumber] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await fetchPatientById(id);
        setPatientData(data);
        setLastName(data.lastName);
        setFirstName(data.firstName);
        setHealthInsuranceNumber(data.healthInsuranceNumber);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
    const fetchOrders = async () => {
      try {

        const ordersOfId = await fetchOrdersByIdPatient(id);
        setOrders(ordersOfId);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchPatients();
    fetchOrders();
  }, [id]);


  return (
    <div className='flex justify-center pt-9 pb-9 bg-primary-dark-blue min-h-screen ml-[10vh] md:ml-[15vh]'>
      <div className='w-4/5 mt-4 md:mt-16 mx-auto p-6 bg-light-white rounded-lg shadow-md'>
        <div className='border-b-2 border-light-gray pb-4 flex items-center justify-center'>
          <MdPerson size={30} className='mr-2' />
          <h1 className='text-center font-bold text-3xl p-2 md:text-4x1 text-secondary-dark-blue '>Fiche patient N°{id}</h1>
        </div>
        <div className="flex flex-col mb-4 mt-8">
          <div className="flex items-center mb-2">
            <label className="w-2/5 text-right whitespace-nowrap">Nom : </label>
            <input type='text' required className="ml-4 h-12 border border-light-gray rounded-full text-base px-5" 
            disabled={!edit}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} />
            {!edit && <MdLock size={20} className='ml-2' />}
          </div>
          <div className="flex items-center mb-2">
            <label className="w-2/5 text-right whitespace-nowrap">Prénom : </label>
            <input type='text' required className="ml-4 h-12 border border-light-gray rounded-full text-base px-5" 
            disabled={!edit}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} />
            {!edit && <MdLock size={20} className='ml-2' />}
          </div>
          <div className="flex items-center mb-2">
            <label className="w-2/5 text-right whitespace-nowrap">Numéro de <br /> d'assurance maladie : </label>
            <input type='text' required className="ml-4 h-12 border border-light-gray rounded-full text-base px-5" 
            disabled={!edit}
            value={healthInsuranceNumber}
            onChange={(e) => setHealthInsuranceNumber(e.target.value)} />
            {!edit && <MdLock size={20} className='ml-2' />}
          </div>
          <div className="flex justify-center mt-6">
            <button className="h-11 pl-5 pr-5 bg-secondary-light-blue border-2 border-black outline-none rounded-full shadow-sm cursor-pointer text-base text-white font-semibold
              transform active:scale-95 transition duration-150 ease-in-out hover:bg-secondary-medium-blue"
              onClick={() => setEdit(!edit)}>
              Modifier les informations
            </button>
          </div>
          <div className="flex justify-center mt-6 border-b-2 pb-4 border-light-gray">
            <button className="h-11 pl-5 pr-5 bg-medium-red border-2 border-black outline-none rounded-full shadow-sm cursor-pointer text-base text-white font-semibold
            transform active:scale-95 transition duration-150 ease-in-out hover:bg-dark-red">
              Supprimer le patient
            </button>
          </div>
          <div className='mt-4'>
            {orders.map((order) => (
              <ItemCard key={order.id} data={order} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;