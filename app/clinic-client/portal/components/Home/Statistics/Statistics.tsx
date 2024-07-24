import React from 'react'
import { stats } from '@/data/data';
import StatisticsCard from './StatisticsCard';
import { IoBarChartOutline } from 'react-icons/io5';

const Statistics = () => {
  return (
    <div className='flex justify-center pt-9 pb-9 bg-primary-dark-blue min-h-screen ml-[10vh] md:ml-[15vh]'>
        <div className='w-4/5 mt-8 md:mt-16 mx-auto p-6 bg-light-white rounded-lg shadow-md'>
            <div className='border-b-2 border-light-gray pb-4 flex items-center justify-center'>
                <IoBarChartOutline size={30} className="mr-2" />
                <h1 className='text-center font-bold text-3xl p-2 md:text-4x1 text-secondary-dark-blue '>Tableau de bord</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-4'>
            {stats.map((data)=>{
                return <div key={data.id}>
                    <StatisticsCard data={data}/>
                </div>
            })}
            </div>
        </div>
    </div>
  );
}

export default Statistics;