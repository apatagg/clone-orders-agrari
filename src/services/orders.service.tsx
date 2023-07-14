import {BaseApi} from './base.service';
import {Order} from '../models/orders';

export default class OrdersService extends BaseApi {
    static instance?: OrdersService;

    static getInstance(): OrdersService {
        if(!OrdersService.instance) OrdersService.instance = new OrdersService();
        return OrdersService.instance;
    }

    getOrders(): Promise<Order[]> {
        return this.api.get('/orders').then(response => {
            return response.data;
        });
    }

    getOrder(id: number): Promise<Order> {
        return this.api.get(`/orders/${id}`).then(response => {
            return response.data;
        });
    }
}
