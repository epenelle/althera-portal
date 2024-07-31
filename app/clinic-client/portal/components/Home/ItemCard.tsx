'use client';
import { useRouter } from 'next/router';
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io';
import { LiaSnowmanSolid } from 'react-icons/lia';

type Patient = {
    id : number;
    numSec: string;
    firstName: string;
    lastName: string;
};

type Order = {
    num: string;
    firstName: string;
    lastName: string;
    date: string;
    statut: string;
};

type Props = {
    data: Patient | Order;
}

const isPatient = (data: Patient | Order): data is Patient => {
    return (data as Patient).numSec !== undefined;
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
                        <h1 className='font-bold text-base text-secondary-dark-blue truncate'>{data.numSec}</h1>
                        <IoIosArrowForward size={24} className='font-bold justify-self-end text-secondary-dark-blue hover:text-primary-light-blue' />
                    </div>
                ) : (
                    <div onClick={() => handleClick('order', data.num.toString())} className='grid-cols-1 grid items-center gap-4 sm:grid-cols-2 sm:gap-2 md:grid-cols-[100px_150px_150px_150px_150px_1fr_24px]'>
                        <LiaSnowmanSolid size={48} className='font-bold text-secondary-dark-blue md:block sm:hidden' />
                        <h1 className='font-bold text-base text-secondary-dark-blue truncate'>{data.num}</h1>
                        <h1 className='font-bold text-base text-secondary-dark-blue truncate'>{data.lastName}</h1>
                        <h1 className='font-bold text-base text-secondary-dark-blue truncate'>{data.firstName}</h1>
                        <h1 className='font-bold text-base text-secondary-dark-blue truncate'>{data.date}</h1>
                        <h1 className='font-bold text-base text-secondary-dark-blue truncate'>{data.statut}</h1>
                        <IoIosArrowForward size={24} className='font-bold justify-self-end text-secondary-dark-blue hover:text-primary-light-blue' />
                    </div>
                )}
        </div>
    );
}

export default PatientCard;