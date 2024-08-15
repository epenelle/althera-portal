import { useRouter } from 'next/router';
import React from 'react'
import { MdArrowForwardIos } from 'react-icons/md';

interface DisplayPProps {
    idPatient: number;
    lastName: string;
    firstName: string;
}

const DisplayP: React.FC<DisplayPProps> = ({ idPatient, lastName, firstName }) => {
    const router = useRouter();
    const handleClickPatient = (patientId: number) => {
        router.push(`/View?type=patient&num=${patientId}`);
    };

  return (
    <div className="flex items-center mb-2">
        <p className="w-2/5 text-right whitespace-nowrap">Patient : </p>
        <div className='flex flex-row ml-4 h-12 border border-light-gray rounded-full text-base px-5 w-56 items-center' 
            onClick={() => handleClickPatient(idPatient)}>
            <p>{lastName} {firstName} </p>
            <MdArrowForwardIos className='ml-auto'/>
        </div>
    </div>
  )
}

export default DisplayP;