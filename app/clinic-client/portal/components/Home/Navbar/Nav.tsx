import React from 'react';
import Image from 'next/image';
import { navLinks } from '@/Constants/Constants';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import { MdLanguage } from 'react-icons/md';
import { CiLogout } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import { useButtonContext } from '../../Helper/ButtonContext';

type Props = {
    openNav:()=>void
}

const Nav = ({openNav}:Props) => {
    const { buttonValue, setButtonValue } = useButtonContext();
    const router = useRouter();
    const handleSubmit = async (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        console.log('Déconnexion réussite');
        router.push("/LoginPage");

    };
  return (
    <div>
        {/* Icône pour ouvrir la navbar en affichage mobile */}
        <div className='fixed top-0 left-0 z-20 items-center p-5 md:hidden'>
            <FaBars onClick={openNav} className='w-6 h-6 cursor-pointer'/>
        </div>
        {/* Contenu de la navbar, caché en affichage mobile */}
        <div className='fixed left-0 top-0 h-full z-10 bg-[#2176FF] shadow-lg hidden md:flex flex-col items-center py-10 -col justify-between'>
            <div className='px-5 mt-5'>
                <Image src="/images/logo_althera_full_blanc.png" alt="Logo" width={150} height={150}/>
            </div>
            {/* Nav Links */}
            <div className='flex flex-col items-center space-y-10'>
                {navLinks.map((link)=>{
                    return (
                        <Link href={link.url} key={link.id}>
                            <button onClick={() => setButtonValue(link.id)} className='text-lg font-semibold cursor-pointer hover:text-blue-800 transition-all duration-200 text-white'>{link.label}</button>
                        </Link>
                    )
                })}
            </div>
            {/* Icons */}
            <div className='flex flex-col items-center space-y-8'>
                <MdLanguage className='w-6 h-6 cursor-pointer hover:text-blue-800'/>
                <CiLogout className='w-6 h-6 cursor-pointer hover:text-red-600' onClick={handleSubmit}  />
            </div>
        </div>
    </div>
  )
}

export default Nav;