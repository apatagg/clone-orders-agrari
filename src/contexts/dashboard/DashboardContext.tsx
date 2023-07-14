import React, { createContext, ReactElement, ReactNode, useReducer } from 'react';
import Reducer, {ContextType, DashboardStateInterface} from './Reducer.service';

export function DashboardStorage({ children }: { children: ReactNode }): ReactElement {
    const [dashboardState, dispatch] = useReducer(Reducer, initializeState());

    return <dashboardContext.Provider value={{ dashboardState, dispatch }}>{children}</dashboardContext.Provider>;
}

export const dashboardContext = createContext({} as ContextType);

export const initialState: DashboardStateInterface = {
    step: 0,
    orders: [],
    filteredOrders: [],
    subscriptions: [],
};

function initializeState() {
    return initialState;
}
