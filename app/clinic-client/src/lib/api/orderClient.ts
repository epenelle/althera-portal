import { getOrders } from './orderActions';
export type { Order } from './orderActions';
export { OrderStatus } from './orderActions';

export const orderClient = {
    getOrders,
};
