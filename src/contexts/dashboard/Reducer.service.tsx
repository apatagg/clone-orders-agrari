import {Dispatch} from 'react';
import {initialState} from './DashboardContext';
import {Order} from '../../models/orders';
import {Subscription} from '../../models/subscription';

export interface DashboardStateInterface {
    step: number;
    orders: Order[];
    subscriptions: Subscription[];
    filteredOrders: Order[];
}

export type ActionType = {
    type:
        'PURGE_STATE' |
        'SET_STATE' |
        'SET_FILTERED_ORDERS' |
        'SET_SUBSCRIPTIONS' |
        'SET_ORDERS' ;
    payload?: any;
};

export type ContextType = {
    dashboardState: DashboardStateInterface;
    dispatch: Dispatch<ActionType>;
};

const Reducer = (state: DashboardStateInterface, action: ActionType): any => {
    switch (action.type) {
        case 'PURGE_STATE':
            return initialState;
        case 'SET_STATE':
            return {...state, ...action.payload};
        case 'SET_ORDERS':
            return {...state, orders: action.payload};
        case 'SET_SUBSCRIPTIONS':
            return {...state, subscriptions: action.payload};
        case 'SET_FILTERED_ORDERS':
            return {...state, filteredOrders: action.payload};
        default:
            return state;
    }
};

export default Reducer;
