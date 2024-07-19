'use client';
import React from 'react'
import { CiViewList } from 'react-icons/ci';
import { IoIosArrowForward } from 'react-icons/io';
import { LiaSnowmanSolid } from 'react-icons/lia';

type Props = {
    data: {
        id: number;
        idclinique: number;
        firstName: string;
        lastName: string;
        numSec: number;
    }
}

const CommandeCard = ({data}: Props) => {
    return (
        <div className='rounded-2xl hover:shadow-md transition-all duration-150 border-2 cursor-pointer border-gray-300 border-opacity-30 p-5'>
            <div className='grid grid-cols-[100px_150px_150px_1fr_24px] items-center gap-4'>
                <CiViewList size={48} className='text-blue-950 hover:text-indigo-800 font-bold' />
                <h1 className='text-base text-blue-950 hover:text-indigo-800 font-bold truncate'>{data.lastName}</h1>
                <h1 className='text-base text-blue-950 hover:text-indigo-800 font-bold truncate'>{data.firstName}</h1>
                <span className='text-sm text-black text-opacity-50'>{data.numSec}</span>
                <IoIosArrowForward size={24} className='justify-self-end text-blue-950 hover:text-indigo-800 font-bold' />
            </div>
        </div>
    )
}

export default CommandeCard;