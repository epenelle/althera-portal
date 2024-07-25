import PatientCard from '@/components/Views/PatientCard';
import OrderCard from '@/components/Views/OrderCard';
import { useRouter } from 'next/router';
import React from 'react';
import '../app/globals.css';
import ResponsiveNav from '@/components/Home/Navbar/ResponsiveNav';

const View: React.FC = () => {
    const router = useRouter();
    const { query } = router;
    const { type, num } = query;

    if (typeof num !== 'string') {
        return <div>Invalid ID</div>;
    }

    return (
      <div>
        <ResponsiveNav />
        {type === 'patient' && <PatientCard id={num} />}
        {type === 'order' && <OrderCard id={num} />}
      </div>
    );
}

export default View;