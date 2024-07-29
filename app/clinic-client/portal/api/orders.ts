import { Order } from '@/components/Helper/OrdersContext';

export const fetchOrders = async (): Promise<Order[]> => {
  try {
	const response = await fetch('/api/orders');
	if (!response.ok) {
	  throw new Error('Network response was not ok');
	}
	const data = await response.json();
	return data;
  } catch (error) {
	console.error('Error fetching orders:', error);
	throw error;
  }
};

export const getOrderById = async (id: number): Promise<Order | null> => {
  try {
	const response = await fetch(`/api/orders/${id}`);
	if (!response.ok) {
	  throw new Error('Network response was not ok');
	}
	const data = await response.json();
	return data;
  } catch (error) {
	console.error(`Error fetching order with id ${id}:`, error);
	return null;
  }
};