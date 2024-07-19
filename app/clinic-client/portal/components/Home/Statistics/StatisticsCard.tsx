'use client';
import React from 'react'
import Tilt from 'react-parallax-tilt';
import Image from 'next/image';
import { BsHeart } from 'react-icons/bs';
import { IoMdArrowDropright } from 'react-icons/io';

type Props = {
    data: {
        id: number;
        image: string;
        name: string;
        maj: number;
        nb: number;
    }
}

const StatisticsCard = ({data}: Props) => {
  return <Tilt tiltMaxAngleY={10} tiltMaxAngleX={10} >
    <div className='rounded-lg border-2 border-gray-300 border-opacity-30 p-6'>
        <div className='w-full h-[100px] relative'>
            <Image src={data.image} alt={data.name} layout="fill" objectFit="contain" className='w-full h-full'/>
        </div>
        <div>
            <div className='flex mt-6 items-center justify-between'>
                <h1 className='text-blue-950 transition-all duration-200 text-base font-bold'>{data.name}</h1>
                <span className='px-5 py-1 border-[1px] rounded-md border-gray-500 text-xs text-green-700 font-bold'>maj : {data.maj} j</span>
            </div>
        </div>
        <p className='mt-2 mb-2 text-grey-700'>
            Nombre actuel : <span className='text-[#2176FF] font-bold'>{data.nb}</span>
        </p>
        <div className='flex items-center mt-4 justify-between '>
            <div className='flex items-center text-gray-600'>
                <h1 className='text-indigo-950 text-sm font-bold hover:text-blue-700'>Consulter</h1>
            </div>
            <div className='flex items-center text-gray-600 space-x-2'>
                <IoMdArrowDropright className='text-base font-bold hover:text-blue-700  '/>
            </div>
        </div>
    </div>
  </Tilt>
}

export default StatisticsCard;