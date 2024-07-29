import React, { createContext, useState, useEffect, ReactNode } from 'react';

export interface Order {
  id: number;
  product: string;
  quantity: number;
  price: number;
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
	  const response = await fetch('/api/orders');
	  const data = await response.json();
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