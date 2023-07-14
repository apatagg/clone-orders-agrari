import React, {useContext, useEffect, useState} from "react";
import {AppShell, Box, Button, Chip, Chips, Group, Header, Indicator, Title, Text} from '@mantine/core';

import logo from "../assets/images/logo_agrari_hor.png";
import MainNavbar from '../components/MainNavbar';
import {dashboardContext} from '../contexts/dashboard/DashboardContext';
import {ArrowLeft, ArrowRight} from 'tabler-icons-react';
import {Calendar} from '@mantine/dates';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs'
import OrdersService from '../services/orders.service';
import SubscriptionsService from '../services/subscriptions.service';
import {Subscription} from '../models/subscription';

dayjs.extend(customParseFormat)

export type DeliveryHour = '16:00 - 20:00' | '10:00 - 14:00'

const Dashboard = () => {
    const {dispatch, dashboardState} = useContext(dashboardContext);

    const [form, setForm] = useState<{ date?: Date, orderIds?: string[] }>({date: undefined, orderIds: []});

    useEffect(() => {
        OrdersService.getInstance().getOrders().then(orders => {
            dispatch({type: 'SET_ORDERS', payload: orders});
        });

        SubscriptionsService.getInstance().getSubscriptions().then(subscriptions => {
            if(subscriptions) {
                const activeSubscriptions = subscriptions.filter(subscription => subscription.active === true);
                dispatch({type: 'SET_SUBSCRIPTIONS', payload: activeSubscriptions});
            } else {
                dispatch({type: 'SET_SUBSCRIPTIONS', payload: []});
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (form.date) {
            const filteredOrders = dashboardState.orders.filter(order =>
                dayjs(Number(order.meta_data.find(
                    ord => ord.key === '_orddd_timestamp',
                )?.value) * 1000).isSame(form.date, 'day'));

            dispatch({type: 'SET_FILTERED_ORDERS', payload: filteredOrders});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form]);

    const handlePartialFormData = (partialFormData: Partial<{ date?: Date, orderIds?: string[] }>) => {
        setForm({...form, ...partialFormData});
    }

    const handleBuildOrders = () => {
        const filteredOrdersByOrderId = dashboardState.orders?.filter(order => form.orderIds?.includes(String(order.id)));
        dispatch({type: 'SET_FILTERED_ORDERS', payload: filteredOrdersByOrderId});
        handleNextStep();
        window.location.href = '/order/' + JSON.stringify(form.orderIds);
    }

    const handleNextStep = () => {
        dispatch({type: 'SET_STATE', payload: {step: dashboardState.step + 1}});
    }

    const handlePreviousStep = () => {
        dispatch({type: 'SET_STATE', payload: {step: dashboardState.step - 1}});
    }

    useEffect(() => {
        // TODO: Load orders from DATE
    }, [dashboardState.step]);

    const getStepFromDashboardState = () => {
        switch (dashboardState.step) {
            case 0:
                return (<DashboardStepOne handleNextStep={handleNextStep} handleData={handlePartialFormData}/>);
            case 1:
                return (<DashboardStepTwo handleNextStep={handleNextStep}
                                          handlePreviousStep={handlePreviousStep}
                                          handleData={handlePartialFormData}
                                          data={form}
                                          handleBuildOrders={handleBuildOrders}/>);
            default:
                return (<></>);
        }
    }

    return (
        <AppShell
            padding="md"
            navbar={<MainNavbar/>}
            header={<Header height={60} p="xs"><img className="logo-header" src={logo} alt={"Logo Agrari"}/></Header>}
            styles={(theme) => ({
                main: {backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]},
            })}
        >
            {getStepFromDashboardState()}

        </AppShell>
    );

};

export default Dashboard;

export interface DashboardStepInterface {
    handleNextStep: () => void;
    handleData: (partialFormData: Partial<{ date?: Date, orderIds?: string[] }>) => void;
    data?: { date?: Date, orderIds?: string[] };
    handlePreviousStep?: () => void;
    handleBuildOrders?: () => void;
}

const DashboardStepOne = ({handleNextStep, handleData}: DashboardStepInterface) => {
    const {dashboardState} = useContext(dashboardContext);
    const [value, setValue] = useState<Date | null>(null);

    const handleSubmit = () => {
        if (value) {
            handleData({date: value});
            handleNextStep();
        }
    };

    const getOrderDates = () => {
        if (dashboardState.orders !== undefined) {
            const orderDates = dashboardState.orders.map(order => dayjs(Number(order.meta_data.find(
                ord => ord.key === '_orddd_timestamp',
            )?.value!) * 1000));

            return orderDates !== undefined ? orderDates : [];
        }
    }

    const getSubscriptionDates = () => {
        const subscriptionDates = dashboardState.subscriptions?.map(subscription => {
            const value: number =
                subscription.dayOfWeek === 'Lunes' ? 1 :
                    subscription.dayOfWeek === 'Martes' ? 2 :
                        subscription.dayOfWeek === 'Miercoles' ? 3 :
                            subscription.dayOfWeek === 'Jueves' ? 4 :
                                subscription.dayOfWeek === 'Viernes' ? 5 :
                                    subscription.dayOfWeek === 'Sabado' ? 6 :
                                        subscription.dayOfWeek === 'Domingo' ? 0 : 0

            return value;
        }).flat();

        return subscriptionDates;

    }

    return (
        <Box mx="auto">
            <form onSubmit={handleSubmit}>
                <Title sx={{marginBottom: '10px'}}>¡Hola! Selecciona la fecha de entrega:</Title>
                <Box sx={(theme) => ({
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
                    borderRadius: '10px',
                })}>
                    <Calendar fullWidth value={value} onChange={setValue} firstDayOfWeek="monday" locale="es"
                              renderDay={(date) => {
                                  const filteredDay = getOrderDates()?.filter(orderDate => dayjs(orderDate).isSame(date, 'day'));
                                  const subscriptionDates = getSubscriptionDates().includes(date.getDay());

                                  return (
                                      <Indicator size={6} position="top-center" color="green" offset={8}
                                                 disabled={!(subscriptionDates)}>
                                          <Indicator size={6} color="red" offset={8}
                                                     disabled={!(filteredDay && filteredDay.length > 0)}>
                                              <div>{date.getDate()}</div>
                                          </Indicator>
                                      </Indicator>
                                  );
                              }}
                    />
                </Box>


                <Group position="right" mt="md">
                    <Button size="md" rightIcon={<ArrowRight/>} type="submit" disabled={!value}>Siguiente</Button>
                </Group>
            </form>
        </Box>
    );
}

const DashboardStepTwo = ({
                              handleNextStep,
                              handlePreviousStep,
                              handleBuildOrders,
                              handleData,
                              data,
                          }: DashboardStepInterface) => {
    const {dashboardState} = useContext(dashboardContext);

    const handleSubmit = () => {
        if (data?.orderIds?.length! > 0) {
            handleBuildOrders !== undefined && handleBuildOrders();
        }
    }

    function getSubscriptionDatesWithNumberFilteredForDay(){
        const subscriptionDates = dashboardState.subscriptions?.map(subscription => {
            const value =
                subscription.dayOfWeek === 'Lunes' ? 1 :
                    subscription.dayOfWeek === 'Martes' ? 2 :
                        subscription.dayOfWeek === 'Miercoles' ? 3 :
                            subscription.dayOfWeek === 'Jueves' ? 4 :
                                subscription.dayOfWeek === 'Viernes' ? 5 :
                                    subscription.dayOfWeek === 'Sabado' ? 6 :
                                        subscription.dayOfWeek === 'Domingo' ? 0 : 0

            return {...subscription, dayOfWeek: value};
        }).flat();

        subscriptionDates.filter(subscription => subscription.dayOfWeek === dayjs(data?.date).day());

        return subscriptionDates;

    }

    type orderIdAndShippingCode = { orderId: number, shippingCode: string };

    const getOrderIds = (isMorning: boolean): any => {
        if (dashboardState.filteredOrders !== undefined) {
            const orderIds: (orderIdAndShippingCode | undefined)[] = dashboardState.filteredOrders.map(order => {
                const timeSlot = order.meta_data.find(
                    metaData => metaData.key === '_orddd_time_slot',
                )?.value;

                const shippingRegexCode = order.shipping_lines[0].method_title.match("\\[(.*)]")
                const shippingCode = shippingRegexCode !== null ? shippingRegexCode[0] : '';

                const value = order.total;

                if (timeSlot && timeSlot.includes(isMorning ? '10:00 - 14:00' : '16:00 - 20:00')) {
                    return {orderId: order.id, shippingCode: shippingCode, value: value};
                } else {
                    return undefined;
                }
            });

            const orderIdsWithoutUndefined = orderIds.filter(orderId => orderId !== undefined);

            return orderIdsWithoutUndefined as orderIdAndShippingCode[];
        }
    }

    return (
        <Box mx="auto">
            <Title sx={{marginBottom: '10px'}}>Selecciona los pedidos a confeccionar:</Title>
            <Text>Mañanas:</Text>
            <Chips multiple value={data?.orderIds} onChange={(e) => {
                handleData({orderIds: e});
            }}>
                {getOrderIds(true)?.map((order: any) => {
                    return (
                        <Chip key={order.orderId}
                              value={order.orderId}>{order.orderId} Area: {order.shippingCode} Precio: {order.value}€</Chip>
                    )
                })}
            </Chips>
            <Text>Tardes:</Text>
            <Chips multiple value={data?.orderIds} onChange={(e) => {
                handleData({orderIds: e});
            }}>
                {getOrderIds(false)?.map((order: any) => {
                    return (
                        <Chip key={order.orderId}
                              value={order.orderId}>{order.orderId} Area: {order.shippingCode} Precio: {order.value}€</Chip>
                    )
                })}
            </Chips>
            <Text>Suscripciones:</Text>
            {getSubscriptionDatesWithNumberFilteredForDay().map(subscription => {
                return (
                    <Text key={subscription.subscriptionID}>{subscription.subscriptionID} - {subscription.dayOfWeek}</Text>
                )
            })
            }
            <Group position="right" mt="md">
                <Button size="md" leftIcon={<ArrowLeft/>} onClick={handlePreviousStep}>Anterior</Button>
                <Button size="md" rightIcon={<ArrowRight/>} onClick={handleSubmit}
                        disabled={!(data?.orderIds?.length! > 0)}>Preparar pedidos</Button>
            </Group>
        </Box>
    );
}
