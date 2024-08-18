import React from 'react';
import '../app/globals.css';
import { useRouter } from 'next/router';
import AddPatient from '@/components/Add/AddPatient';
import AddOrder from '@/components/Add/AddOrder';
import ResponsiveNav from '@/components/Home/Navbar/ResponsiveNav';

const Add = () => {
  const router = useRouter();
  const { query } = router;
  const { type } = query;

  return (
    <div>
      <ResponsiveNav />
      {type === 'patient' && <AddPatient />}
      {type === 'order' && <AddOrder />}
    </div>
  );
};

export default Add;
