import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// @mui
import { Grid, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../routes/paths';
// redux
import { useDispatch, useSelector } from '../redux/store';

import {
    resetCart,
    getCart,
    nextStep,
    backStep,
    gotoStep,
    deleteCart,
    createBilling,
    applyShipping,
    applyDiscount,
    increaseQuantity,
    decreaseQuantity,
} from '../redux/slices/book';
// @types
// import { ICheckoutBillingAddress } from '../@types/product';
import { ICheckoutBillingAddress } from '../@types/books';
// components
import CustomBreadcrumbs from '../components/custom-breadcrumbs';
import { useSettingsContext } from '../components/settings';
// sections
import {
    CheckoutCart,
    CheckoutSteps,
    CheckoutPayment,
    CheckoutOrderComplete,
    CheckoutBillingAddress,
} from '../sections/e-commerce/checkout';

// ----------------------------------------------------------------------

const STEPS = ['Cart', 'Billing & address', 'Payment'];

// ----------------------------------------------------------------------

export default function EcommerceCheckoutPage() {
    const navigate = useNavigate();

    const { themeStretch } = useSettingsContext();

    const accessToken: any = typeof window !== 'undefined' ? localStorage.getItem('access_Token') : '';

    const dispatch = useDispatch();

    const { checkout } = useSelector((state) => state.book);

    const { cart, billing, activeStep } = checkout;

    const completed = activeStep === STEPS.length;

    useEffect(() => {
        dispatch(getCart(cart));
    }, [dispatch, cart]);

    useEffect(() => {
        if (activeStep === 1) {
            dispatch(createBilling(null));
        }
    }, [dispatch, activeStep]);

    const handleNextStep = () => {
        dispatch(nextStep());
    };

    const handleBackStep = () => {
        dispatch(backStep());
    };

    const handleGotoStep = (step: number) => {
        dispatch(gotoStep(step));
    };

    const handleApplyDiscount = (value: number) => {
        if (cart.length) {
            dispatch(applyDiscount(value));
        }
    };

    const handleDeleteCart = (productId: any) => {
        dispatch(deleteCart(productId));
    };

    const handleIncreaseQuantity = (productId: string) => {
        dispatch(increaseQuantity(productId));
    };

    const handleDecreaseQuantity = (productId: string) => {
        dispatch(decreaseQuantity(productId));
    };

    const handleCreateBilling = (address: ICheckoutBillingAddress) => {
        dispatch(createBilling(address));
        dispatch(nextStep());
    };

    const handleApplyShipping = (value: number) => {
        dispatch(applyShipping(value));
    };

    const handleReset = () => {
        if (completed) {
            dispatch(resetCart());
            navigate(PATH_PAGE.danhmuc, { replace: true });
        }
    };

    return (
        <>
            <Helmet>
                <title>Checkout | Minimal UI</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Checkout"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        {
                            name: 'E-Commerce',
                            href: PATH_DASHBOARD.eCommerce.root,
                        },
                        { name: 'Checkout' },
                    ]}
                />

                <Grid container justifyContent={completed ? 'center' : 'flex-start'}>
                    <Grid item xs={12} md={8}>
                        <CheckoutSteps activeStep={activeStep} steps={STEPS} />
                    </Grid>
                </Grid>

                {completed ? (
                    <CheckoutOrderComplete open={completed} onReset={handleReset} onDownloadPDF={() => { }} />
                ) : (
                    <>
                        {activeStep === 0 && (
                            <CheckoutCart
                                checkout={checkout}
                                onNextStep={handleNextStep}
                                onDeleteCart={handleDeleteCart}
                                onApplyDiscount={handleApplyDiscount}
                                onIncreaseQuantity={handleIncreaseQuantity}
                                onDecreaseQuantity={handleDecreaseQuantity}
                            />
                        )}
                        {activeStep === 1 && (
                            <CheckoutBillingAddress
                                accessToken={accessToken}
                                checkout={checkout}
                                onNextStep={handleNextStep}
                                onBackStep={handleBackStep}
                                onCreateBilling={handleCreateBilling}
                            />
                        )}
                        {activeStep === 2 && (
                            <CheckoutPayment
                                checkout={checkout}
                                onNextStep={handleNextStep}
                                onBackStep={handleBackStep}
                                onGotoStep={handleGotoStep}
                                onApplyShipping={handleApplyShipping}
                                onReset={handleReset}
                            />
                        )}
                    </>
                )}
            </Container>
        </>
    );
}