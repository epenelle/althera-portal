import React from 'react'
import '../app/globals.css';

import { useButtonContext } from '../components/Helper/ButtonContext';

import ResponsiveNav from '../components/Home/Navbar/ResponsiveNav';
import ScrollToTop from '../components/Helper/ScrollToTop';

import Statistics from '../components/Home/Statistics/Statistics';
import ListePatients from '@/components/Home/ListePatients/ListePatients';
import ListeCommandes from '@/components/Home/ListeCommandes/ListeCommandes';
import Account from '@/components/Home/Account/Account';

const Home = () => {
  const { buttonValue, setButtonValue } = useButtonContext();
  return (
    
      <div >
          <ResponsiveNav />
        <main>
          {buttonValue === 1 && <Statistics />}
          {buttonValue === 2 && <ListePatients />}
          {buttonValue === 3 && <ListeCommandes />}
          {buttonValue === 4 && <Account />}
        </main>
        <ScrollToTop/>
      </div>
  )
}

export default Home;