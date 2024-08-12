import { Order } from "@/Constants/Types";

const baseUrl = 'http://localhost:5125/orders';

const transformOrder = (order: any, index: number = 0): Order => ({
	id: order.id || index + 1,
	orthesisModel: order.orthesisModel || "Unknown",
	orthesisComment: order.orthesisComment || "Unknown",
	patientId: order.patientId || 0,
	orderDate: order.orderDate || "Unknown",
	orderState: order.orderState || "Unknown",
	patient: order.patient || {},
});

export const fetchOrders = async (): Promise<Order[]> => {
	try {
	  const response = await fetch(baseUrl, {
		method: "GET",
		headers: {
		  'Content-Type': 'application/json'
		}
	  });
	  if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	  }
	  const json = await response.json();
	  const ordersData: Order[] = json.map((order: any, index: number) => transformOrder(order, index));
	  return ordersData;
	} catch (error) {
	  console.error('Error fetching orders:', error);
	  throw error;
	}
};
  
export const fetchOrderById = async (id: string): Promise<Order> => {
	try {
	  const response = await fetch(`${baseUrl}/${id}`, {
		method: "GET",
		headers: {
		  'Content-Type': 'application/json'
		}
	  });
	  if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	  }
	  const order = await response.json();
	  const orderData: Order = transformOrder(order);
	  return orderData;
	} catch (error) {
	  console.error(`Error fetching patient with id ${id}:`, error);
	  throw error;
	}
};

export const fetchPatientOrders = async (id: string): Promise<Order[]> => {
	try {
	  const response = await fetch(`${baseUrl}?patientId=${id}`, {
		method: "GET",
		headers: {
		  'Content-Type': 'application/json'
		}
	  });
	  if (response.status === 204) {
		return []; 
	}
	  if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	  }
	  const json = await response.json();
	  const ordersData: Order[] = json.map((order: any, index: number) => transformOrder(order, index));
	  return ordersData;
	} catch (error) {
	  console.error('Error fetching orders:', error);
	  throw error;
	}
};

export const addOrder = async (order: Order): Promise<{ success: boolean; message: string }> => {
    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order) 
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        await response.json();
        return {
            success: true,
            message: 'Order added successfully'
        };
    } catch (error) {
        console.error('Error adding order:', error);
        return {
            success: false,
            message: `Error adding order: ${(error as Error).message}`
        };
    }
};

export const deleteById = async (id: string): Promise<{ success: boolean }> => {
	try {
	  const response = await fetch(`${baseUrl}/${id}`, {
		method: "DELETE",
		headers: {
		  'Content-Type': 'application/json'
		}
	});
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	return {
		success: true,
	};
	} catch (error) {
	console.error('Error deleting order:', error);
		return {
			success: false,
		};
	}
};