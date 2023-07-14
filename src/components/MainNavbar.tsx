import React, {useContext, useEffect, useState} from "react";
import { Navbar, Stepper} from '@mantine/core';

import {dashboardContext} from '../contexts/dashboard/DashboardContext';

const MainNavbar = () => {
    const {dashboardState} = useContext(dashboardContext);

    const [active, setActive] = useState(dashboardState.step);

    useEffect(() => {
        setActive(dashboardState.step);
    }, [dashboardState.step]);

    if(dashboardState.step < 2) {
        return (
            <Navbar width={{base: 300}} p="xs">
                <Stepper active={active} orientation="vertical">
                    <Stepper.Step label="Paso 1" description="Selecciona la fecha de los pedidos"/>
                    <Stepper.Step label="Paso 2" description="Elige los pedidos que quieres preparar"/>
                </Stepper>
            </Navbar>
        );
    } else {
        return(null);
    }
};

export default MainNavbar;
