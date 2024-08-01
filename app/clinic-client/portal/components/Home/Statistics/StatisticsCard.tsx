'use client';
import React from 'react'
import Tilt from 'react-parallax-tilt';
import Image from "next/legacy/image";
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
    return (
        <Tilt tiltMaxAngleY={10} tiltMaxAngleX={10} >
          <div className='border-light-gray border-2 border-opacity-30 p-6 rounded-lg'>
              <div className='relative w-full h-[100px]'>
                  <Image src={data.image} alt={data.name} layout="fill" objectFit="contain" className='w-full h-full'/>
              </div>
              <div>
                  <div className='flex items-center justify-between mt-6'>
                      <h1 className='text-secondary-dark-blue text-base font-bold transition-all duration-200'>{data.name}</h1>
                      <span className='border-dark-green text-dark-green font-bold border-[1px] px-5 py-1 rounded-md text-xs'>maj : {data.maj} j</span>
                  </div>
              </div>
              <p className='text-dark-gray mt-2 mb-2'>
                  Nombre actuel : <span className='text-primary-light-blue font-bold'>{data.nb}</span>
              </p>
              <div className='flex items-center justify-between mt-4'>
                  <div className='flex items-center'>
                      <h1 className='text-primary-dark-blue text-sm font-bold hover:text-secondary-medium-blue'>Consulter</h1>
                  </div>
                  <div className='flex items-center text-dark-gray space-x-2'>
                      <IoMdArrowDropright className='text-base font-bold hover:text-secondary-medium-blue'/>
                  </div>
              </div>
          </div>
        </Tilt>
    );
}

export default StatisticsCard;