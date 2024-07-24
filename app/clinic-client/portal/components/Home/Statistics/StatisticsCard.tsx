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
    <div className='rounded-lg border-2 border-light-gray border-opacity-30 p-6'>
        <div className='w-full h-[100px] relative'>
            <Image src={data.image} alt={data.name} layout="fill" objectFit="contain" className='w-full h-full'/>
        </div>
        <div>
            <div className='flex mt-6 items-center justify-between'>
                <h1 className='text-secondary-dark-blue transition-all duration-200 text-base font-bold'>{data.name}</h1>
                <span className='px-5 py-1 border-[1px] rounded-md border-dark-green text-xs text-dark-green font-bold'>maj : {data.maj} j</span>
            </div>
        </div>
        <p className='mt-2 mb-2 text-dark-gray'>
            Nombre actuel : <span className='text-primary-light-blue font-bold'>{data.nb}</span>
        </p>
        <div className='flex items-center mt-4 justify-between '>
            <div className='flex items-center'>
                <h1 className='text-primary-dark-blue text-sm font-bold hover:text-secondary-medium-blue'>Consulter</h1>
            </div>
            <div className='flex items-center text-dark-gray space-x-2'>
                <IoMdArrowDropright className='text-base font-bold hover:text-secondary-medium-blue  '/>
            </div>
        </div>
    </div>
  </Tilt>
}

export default StatisticsCard;