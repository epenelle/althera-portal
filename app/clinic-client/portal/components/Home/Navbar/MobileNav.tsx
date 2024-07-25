import React from 'react'
import Image from 'next/image';
import { BiX } from 'react-icons/bi';
import { navLinks } from '@/Constants/Constants';
import Link from 'next/link';
import { MdLanguage } from 'react-icons/md';
import { CiLogout } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import { useButtonContext } from '../../Helper/ButtonContext';

type Props = {
    nav:boolean,
    closeNav:()=>void
}

const MobileNav = ({closeNav, nav}:Props) => {
    const ResponsiveNav = nav ? "translate-x-0" : "translate-x-[-100%]";
    const { buttonValue, setButtonValue } = useButtonContext();
    const router = useRouter();

    const handleSubmit = async (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        console.log('Déconnexion réussite');
        router.push("/LoginPage");

    };

    const handleMenuClick = (type: string) => {
        router.push('/Home?type=' + type);
    };
    return (
        <div className={`transform ${ResponsiveNav} transition-all duration-500 fixed top-0 left-0 z-50 h-[100vh] right-0 bottom-0 bg-primary-light-blue`}>
            {/* Logo */}
            <div>
                <Image src="/images/logo_althera_full_blanc.png" alt="Logo" width={180} height={180} className='mt-5 ml-5'/>
                <BiX onClick={closeNav} className='w-8 h-8 absolute top-[2rem] text-black z-[202] right-[2rem]'/>
            </div>
            {/* Nav Links */}
            <div className='relative z-[201] space-y-12 flex flex-col items-center justify-center h-[60%]'>
                {navLinks.map((link)=>{
                    return (
                        <p key={link.id} onClick={() => { handleMenuClick(link.url); closeNav(); }} className='text-2x1 font-semibold text-light-white cursor-pointer active:text-secondary-dark-blue transition-all duration-20'>{link.label}</p> 
                    )   
                })}
            </div>
            <div className='flex flex-col items-center space-y-8'>
                <MdLanguage className='w-6 h-6 cursor-pointer hover:text-light-white'/>
                <CiLogout className='w-6 h-6 cursor-pointer hover:text-medium-red' onClick={handleSubmit}  />
            </div>
        </div>
    )
}

export default MobileNav;