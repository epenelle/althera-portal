import { API_BASE_URL, defaultHeaders } from './config';

export enum OrderStatus {
    InProgress = 'in_progress',
    Completed = 'completed',
    Cancelled = 'cancelled',
}

export interface Order {
    id: string;
    number: string;
    firstName: string;
    lastName: string;
    dateCreated: Date;
    status: OrderStatus;
}

export async function getOrders(signal?: AbortSignal): Promise<Order[]> {
    const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'GET',
        headers: defaultHeaders,
        signal,
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch orders, status: ${response.status}`);
    }

    const data = await response.json();

    return data.map((order: any) => ({
        id: order.id,
        number: order.number ?? order.id,
        firstName: order.patient?.firstName ?? '',
        lastName: order.patient?.lastName ?? '',
        dateCreated: new Date(order.dateCreated ?? order.createdAt),
        status: order.status as OrderStatus ?? OrderStatus.InProgress,
    }));
}
