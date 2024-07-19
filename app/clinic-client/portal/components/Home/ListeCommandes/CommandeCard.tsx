'use client';
import React from 'react'
import { CiViewList } from 'react-icons/ci';
import { IoIosArrowForward } from 'react-icons/io';

type Props = {
    patient: {
        id: number;
        idclinique: number;
        firstName: string;
        lastName: string;
        numSec: string;
    }
}

const PatientCard = ({patient}: Props) => { 
    return (
        <div className='rounded-2xl hover:shadow-md transition-all duration-150 border-2 cursor-pointer border-gray-300 border-opacity-30 mb-2 p-5 sm:p-3'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[100px_150px_150px_1fr_24px] items-center gap-4 sm:gap-2'>
                <CiViewList size={48} className='text-blue-950 font-bold sm:hidden md:block' />
                <h1 className='text-base text-blue-950 font-bold truncate'>{patient.lastName}</h1>
                <h1 className='text-base text-blue-950 font-bold truncate'>{patient.firstName}</h1>
                <h1 className='text-base text-blue-950 font-bold truncate'>{patient.numSec}</h1>
                <IoIosArrowForward size={24} className='justify-self-end text-blue-950 hover:text-indigo-800 font-bold' />
            </div>
        </div>
    )
}

export default PatientCard;