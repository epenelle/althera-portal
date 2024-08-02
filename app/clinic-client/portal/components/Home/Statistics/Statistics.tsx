import React from 'react'
import { stats } from '@/Constants/Constants';
import StatisticsCard from './StatisticsCard';
import { IoBarChartOutline } from 'react-icons/io5';

const Statistics = () => {
  return (
    <div className='bg-primary-dark-blue flex justify-center min-h-screen ml-[10vh] md:ml-[15vh] pb-9 pt-9'>
        <div className='bg-light-white mx-auto mt-8 w-4/5 md:mt-16 p-6 rounded-lg shadow-md'>
            <div className='border-light-gray border-b-2 flex items-center justify-center pb-4'>
                <IoBarChartOutline size={30} className="mr-2" />
                <h1 className='text-secondary-dark-blue text-center font-bold md:text-4x1 p-2 text-3xl'>Tableau de bord</h1>
            </div>
            <div className='grid-cols-1 grid gap-6 lg:grid-cols-3 md:grid-cols-2 mt-4 xl:grid-cols-3'>
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