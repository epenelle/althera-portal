import React, { createContext, useState, ReactNode, useContext } from 'react';
import { fetchPatients as fetchPatientsFromAPI } from '@/api/patients';
import { fetchOrders as fetchOrdersFromAPI } from '@/api/orders';
import { Patient, Order } from '@/Constants/Types';

interface GlobalContextProps {
    Patients: Patient[];
    Orders: Order[];
    fetchPatients: () => void;
    fetchOrders: () => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [Patients, setPatients] = useState<Patient[]>([]);
    const [Orders, setOrders] = useState<Order[]>([]);

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
        <GlobalContext.Provider value={{ Patients, Orders, fetchPatients, fetchOrders }}>
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