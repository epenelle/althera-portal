import React from 'react'
import '../app/globals.css';

import { useRouter } from 'next/router';

import ResponsiveNav from '../components/Home/Navbar/ResponsiveNav';
import ScrollToTop from '../components/Helper/ScrollToTop';

import Statistics from '../components/Home/Statistics/Statistics';
import ListePatients from '@/components/Home/ListePatients/ListePatients';
import ListeCommandes from '@/components/Home/ListeCommandes/ListeCommandes';
import Account from '@/components/Home/Account/Account';
import { PatientsProvider } from '@/components/Helper/PatientsContext';

const Home = () => {
  const router = useRouter();
  const { query } = router;
  const { type } = query;
  
  return (
    
      <div >
          <ResponsiveNav />
        <main>
        <PatientsProvider>
          {type === 'dashboard' && <Statistics />}
          {type === 'patients' && <ListePatients />}
          {type === 'orders' && <ListeCommandes />}
          {type === 'account' && <Account />}
        </PatientsProvider>
        </main>
        <ScrollToTop/>
      </div>
  )
}

export default Home;