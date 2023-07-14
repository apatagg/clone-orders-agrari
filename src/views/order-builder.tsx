import React, {useEffect, useState} from "react";
import {AppShell, Button, Col, Grid, Group, Header, Paper, Step, Stepper, Title, Text} from '@mantine/core';

import logo from "../assets/images/logo_agrari_hor.png";
import {ArrowBack, ArrowLeft, ArrowRight, CircleCheck} from 'tabler-icons-react';
import {useParams} from 'react-router-dom';
import OrdersService from '../services/orders.service';
import WeightService from '../services/weight.service';
import {LineItem, Order} from '../models/orders';

const OrderBuilder = () => {
    const [orderStep, setOrderStep] = useState<LineItem[]>([]);

    const params = useParams();

    const [currentStep, setCurrentStep] = useState(0);
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const ids: number[] = params.ids ? JSON.parse(params.ids) : [];

        const promises = ids.map(id => OrdersService.getInstance().getOrder(id));

        Promise.all(promises).then(responses => {
            const ordersWithMetaData = responses.map<Order>(response => {
                response.line_items.forEach(lineItem => {
                    lineItem.meta_product_amount = parseFloat(lineItem.meta_data.find(
                        metaData => metaData.key === 'productAmount'
                    )?.value.replace(',', '.') ?? '0');
                    lineItem.meta_product_name = lineItem.meta_data.find(
                        metaData => metaData.key === 'productName'
                    )?.value;
                    lineItem.meta_product_unit = lineItem.meta_data.find(
                        metaData => metaData.key === 'productUnit'
                    )?.value;
                });

                return response;
            });

            setOrders(ordersWithMetaData);

            const allProducts = responses.map(order => {
                return order.line_items;
            }).flat();

            const allNonDuplicatedProducts = Array.from(allProducts.reduce((m, t) => m.set(t.product_id, t), new Map()).values());

            const orderedNonDuplicatedProducts = WeightService.getInstance().reorderByWeight(allNonDuplicatedProducts);
            setOrderStep(orderedNonDuplicatedProducts);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const currentProductOfOrder = (order: Order) => {
        return order.line_items.find(lineItem => lineItem.product_id === orderStep[currentStep].product_id);
    }

    return (
        <AppShell
            padding="md"
            header={<Header height={60} p="xs"><img className="logo-header" src={logo} alt={"Logo Agrari"}/></Header>}
            styles={(theme) => ({
                main: {backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]},
            })}
        >
            <Title order={1}>Producto actual: {orderStep[currentStep] ? orderStep[currentStep].name : 'None'}</Title>
            <Grid>
                {orders.map((order, index) => {
                    return (
                        <Col key={index} span={12/orders.length}>
                            <Paper shadow="xs" p="md" sx={{backgroundColor: currentProductOfOrder(order) ? '#c4dae8' : '#ffdddd'}}>
                                <Title>{order.id}</Title>
                                <Text>{currentProductOfOrder(order)?.meta_product_name ?? ''}</Text>
                                <Text>{(currentProductOfOrder(order)?.quantity && currentProductOfOrder(order)?.meta_product_amount) ?
                                            currentProductOfOrder(order)?.quantity! * currentProductOfOrder(order)?.meta_product_amount!
                                            : ""
                                    }
                                    {" "}
                                    {currentProductOfOrder(order)?.meta_product_unit ?? ""}
                                </Text>
                            </Paper>
                        </Col>
                    );
                })}
            </Grid>
            <Stepper active={currentStep} onStepClick={setCurrentStep} size="xs" breakpoint="sm">
                {orderStep.map((step, index) => {
                    return (
                        <Step key={step.name} icon={<></>} label={index === currentStep ? step.name : ""}/>
                    )
                })}

            </Stepper>
            <Group position="center" mt="md">
                {currentStep === 0 && (
                    <Button size="md" leftIcon={<ArrowBack/>}
                            onClick={() => window.location.href = '/'}>
                        Volver
                    </Button>)
                }
                {(currentStep < orderStep.length && currentStep >= 1) && (
                <Button size="md" leftIcon={<ArrowLeft/>}
                        onClick={() => setCurrentStep(currentStep - 1)}
                        disabled={currentStep <= 0}>
                    Anterior
                </Button>
                )}
                {currentStep === orderStep.length - 1 && (
                    <Button size="md" rightIcon={<CircleCheck/>}
                            onClick={() => window.location.href = '/'}>
                        Done
                    </Button>)
                }
                {currentStep < orderStep.length -1 && (
                    <Button size="md" rightIcon={<ArrowRight/>}
                            onClick={() => setCurrentStep(currentStep + 1)}
                            disabled={currentStep === orderStep.length}>
                        Siguiente
                    </Button>
                )}
            </Group>
        </AppShell>
    );

};

export default OrderBuilder;
