import React from 'react';
import './assets/global.sass';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Dashboard from './views/dashboard';
import {DashboardStorage} from './contexts/dashboard/DashboardContext';
import 'dayjs/locale/es';
import OrderBuilder from './views/order-builder';
import Login from './views/login';
import {firebaseConfig} from './config';
import {initializeApp} from 'firebase/app';
import AuthRoute from './components/AuthRoute';

initializeApp(firebaseConfig);

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/builder" element={
                    <AuthRoute>
                        <DashboardStorage>
                            <Dashboard/>
                        </DashboardStorage>
                    </AuthRoute>
                }/>
                <Route path="/order/:ids" element={
                    <AuthRoute>
                        <OrderBuilder/>
                    </AuthRoute>
                }/>
                <Route path="/" element={
                    <Login/>
                }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
