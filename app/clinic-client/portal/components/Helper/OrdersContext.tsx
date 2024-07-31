import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { fetchOrders as fetchOrdersFromAPI } from '@/api/orders';

interface Order {
	id?: number;
	orthesisModel: string;
	orthesisComment: string;
	patientId: number;
}

interface OrdersContextProps {
  orders: Order[];
  fetchOrders: () => void;
}

export const OrdersContext = createContext<OrdersContextProps | undefined>(undefined);

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      const data = await fetchOrdersFromAPI();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrdersContext.Provider value={{ orders, fetchOrders }}>
      {children}
    </OrdersContext.Provider>
  );
};