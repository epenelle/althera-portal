import React from 'react';
import Image from "next/legacy/image";
import { navLinks } from '@/Constants/Constants';
import { FaBars } from 'react-icons/fa';
import { CiLogout } from 'react-icons/ci';
import { useRouter } from 'next/navigation';

type Props = {
    openNav:()=>void
}

const Nav = ({openNav}:Props) => {
    const router = useRouter();

    const handleSubmit = async (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        router.push("/LoginPage");
    };

    const handleMenuClick = (type: string) => {
        router.push('/Home?type=' + type);
    };
    
    return (
        <div>
            <div className='fixed top-0 left-0 z-20 items-center p-5 md:hidden'>
                <FaBars onClick={openNav} className='w-6 h-6 cursor-pointer'/>
            </div>
            <div className='fixed left-0 top-0 h-full z-10 bg-primary-dark-blue shadow-lg hidden md:flex flex-col items-center py-10 -col justify-between'>
                <div className='px-5 mt-5'>
                    <Image src="/images/logo_althera_full_blanc.png" alt="Logo" width={150} height={70} priority 
                    className="object-contain object-center"/>
                </div>
                <div className='flex flex-col items-center space-y-2 w-full'>
                    {navLinks.map((link)=>{
                        return (
                            <button
                                key={link.id}
                                onClick={() => handleMenuClick(link.url)}
                                className='block text-lg font-semibold hover:text-secondary-light-blue transition-all duration-200 text-white w-full py-2'>{link.label}
                            </button>
                        )
                    })}
                </div>
                <div className='flex flex-col items-center space-y-8'>
                    <CiLogout className='w-6 h-6 cursor-pointer hover:text-medium-red' onClick={handleSubmit}  />
                </div>
            </div>
        </div>
    )
}

export default Nav;