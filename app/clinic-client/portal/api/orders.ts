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
	  const response = await fetch('http://localhost:5125/orders', {
		method: "GET",
		headers: {
		  'Content-Type': 'application/json'
		}
	  });
	  if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	  }
	  const json = await response.json();
	  console.log('Orders:', json);
	  const ordersData: Order[] = json.map((order: any, index: number) => transformOrder(order, index));
  
	  return ordersData;
	} catch (error) {
	  console.error('Error fetching orders:', error);
	  throw error;
	}
  };
  
  export const fetchPatientById = async (id: string): Promise<Order> => {
	try {
	  const response = await fetch(`http://localhost:5125/patients/${id}`, {
		method: "GET",
		headers: {
		  'Content-Type': 'application/json'
		}
	  });
	  if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	  }
	  const patient = await response.json();
  
	  const patientData: Order = transformOrder(patient);
  
	  return patientData;
	} catch (error) {
	  console.error(`Error fetching patient with id ${id}:`, error);
	  throw error;
	}
  };

export const addOrder = async (order: Order): Promise<{ success: boolean; message: string }> => {
    try {
        console.log('Sending patient data:', order);
        const response = await fetch('http://localhost:5125/orders', {
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