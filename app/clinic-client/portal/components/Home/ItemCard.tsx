'use client';
import { useRouter } from 'next/router';
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io';
import { LiaSnowmanSolid } from 'react-icons/lia';

type Patient = {
    id : number;
    healthInsuranceNumber: string;
    firstName: string;
    lastName: string;
};

type Order = {
    id: number;
    firstName: string;
    lastName: string;
    date: string;
    statut: string;
    patient: Patient;
};

type Props = {
    data: any;
}

const isPatient = (data: Patient | Order): data is Patient => {
    return (data as Patient).healthInsuranceNumber !== undefined;
};


const PatientCard = ({data}: Props) => {
    const router = useRouter();

    const handleClick = (type: string, id: string) => {
        router.push(`/View?type=${type}&num=${id}`);
    };

    return (
        <div className='border-light-gray border-2 border-opacity-30 cursor-pointer hover:shadow-md mb-2 p-5 rounded-2xl sm:p-3 transition-all duration-150'>
                {isPatient(data) ? (
                    <div onClick={() => handleClick('patient', data.id.toString())} className='grid-cols-1 grid items-center gap-4 sm:grid-cols-2 sm:gap-2 md:grid-cols-[100px_150px_150px_1fr_24px]'>
                        <LiaSnowmanSolid size={48} className='font-bold text-secondary-dark-blue md:block sm:hidden' />
                        <h1 className='font-bold text-base text-secondary-dark-blue truncate'>{data.lastName}</h1>
                        <h1 className='font-bold text-base text-secondary-dark-blue truncate'>{data.firstName}</h1>
                        <h1 className='font-bold text-base text-secondary-dark-blue truncate'>{data.healthInsuranceNumber}</h1>
                        <IoIosArrowForward size={24} className='font-bold justify-self-end text-secondary-dark-blue hover:text-primary-light-blue' />
                    </div>
                ) : (
                    console.log('Order:', data),
                    <div onClick={() => handleClick('order', data.id.toString())} className='grid-cols-1 grid items-center gap-4 sm:grid-cols-2 sm:gap-2 md:grid-cols-[100px_150px_150px_150px_150px_1fr_24px]'>
                        <LiaSnowmanSolid size={48} className='font-bold text-secondary-dark-blue md:block sm:hidden' />
                        <h1 className='font-bold text-base text-secondary-dark-blue truncate'>{data.id}</h1>
                        <h1 className='font-bold text-base text-secondary-dark-blue truncate'>{data.patient.lastName}</h1>
                        <h1 className='font-bold text-base text-secondary-dark-blue truncate'>{data.patient.firstName}</h1>
                        <h1 className='font-bold text-base text-secondary-dark-blue truncate'>{data.orderDate}</h1>
                        <h1 className='font-bold text-base text-secondary-dark-blue truncate'>{data.orderState}</h1>
                        <IoIosArrowForward size={24} className='font-bold justify-self-end text-secondary-dark-blue hover:text-primary-light-blue' />
                    </div>
                )}
        </div>
    );
}

export default PatientCard;