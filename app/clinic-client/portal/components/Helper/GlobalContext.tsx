// app/clinic-client/portal/components/Helper/GlobalContext.tsx
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { fetchPatients as fetchPatientsFromAPI } from '@/api/patients';
import { fetchOrders as fetchOrdersFromAPI } from '@/api/orders';

interface Patient {
    id?: number;
    firstName: string;
    lastName: string;
    healthInsuranceNumber: string;
    ClinicId?: string;
}

interface Order {
	id?: number;
	orthesisModel: string;
	orthesisComment: string;
	patientId: number;
	orderDate?: string;
	orderState?: string;
	patient: Patient;
}
interface GlobalContextProps {
    patients: Patient[];
    orders: Order[];
    fetchPatients: () => void;
    fetchOrders: () => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);

    const fetchPatients = async () => {
        try {
            const data = await fetchPatientsFromAPI();
            setPatients(data);
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    };

    const fetchOrders = async () => {
        try {
            const data = await fetchOrdersFromAPI();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    return (
        <GlobalContext.Provider value={{ patients, orders, fetchPatients, fetchOrders }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};