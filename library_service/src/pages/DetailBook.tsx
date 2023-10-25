import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Tab, Tabs, Card, Grid, Divider, Container, Typography, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../redux/store';
// import { getProduct, addToCart, gotoStep } from '../redux/slices/product';
import { getBook, addToCart, gotoStep } from '../redux/slices/book';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// @types
// import { ICheckoutCartItem } from '../@types/product';
import { ICheckoutCartItem } from '../@types/books';
// components
import Iconify from '../components/iconify';
import Markdown from '../components/markdown';
import CustomBreadcrumbs from '../components/custom-breadcrumbs';
import { useSettingsContext } from '../components/settings';
import { SkeletonProductDetails } from '../components/skeleton';
// sections
import {
    ProductDetailsSummary,
    ProductDetailsReview,
    ProductDetailsCarousel,
} from '../sections/@dashboard/e-commerce/details';
import BookDetailsSummary from '../sections/detailbook/BookDetailsSummary'
import BookDetailsCarousel from '../sections/detailbook/BookDetailsCarousel'
import CartWidget from '../sections/@dashboard/e-commerce/CartWidget';
import axios from 'axios';

// ----------------------------------------------------------------------

const SUMMARY = [
    {
        title: '100% Original',
        description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
        icon: 'ic:round-verified',
    },
    {
        title: '10 Day Replacement',
        description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
        icon: 'eva:clock-fill',
    },
    {
        title: 'Year Warranty',
        description: 'Cotton candy gingerbread cake I love sugar sweet.',
        icon: 'ic:round-verified-user',
    },
];

// ----------------------------------------------------------------------

export default function EcommerceProductDetailsPage() {
    const { themeStretch } = useSettingsContext();

    const { name } = useParams();

    const dispatch = useDispatch();
    const { product, isLoading, checkout } = useSelector((state) => state.book);

    useEffect(() => {
        if (name) {
            dispatch(getBook(name as string));
        }
    }, [dispatch, name]);

    const handleAddCart = (newProduct: ICheckoutCartItem) => {
        dispatch(addToCart(newProduct));
    };

    const handleGotoStep = (step: number) => {
        dispatch(gotoStep(step));
    };
    useSelector((state) => state.product);

    return (
        <>
            <Helmet>
                <title>{`Ecommerce: ${product?.title || ''} | Minimal UI`}</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'lg'} sx={{ pt: 10 }}>
                <CustomBreadcrumbs
                    heading="Sách chi tiết"
                    links={[

                        {
                            name: 'Tên sách',
                            href: PATH_DASHBOARD.eCommerce.root,
                        },

                        { name: product?.title },
                    ]}
                />

                {product && (
                    <>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={7}>
                                <BookDetailsCarousel product={product} />
                            </Grid>

                            <Grid item xs={12} md={6} lg={5}>
                                <BookDetailsSummary
                                    product={product}
                                    cart={checkout.cart}
                                    onAddCart={handleAddCart}
                                    onGotoStep={handleGotoStep}
                                />
                            </Grid>
                        </Grid>

                        <Box
                            gap={5}
                            display="grid"
                            gridTemplateColumns={{
                                xs: 'repeat(1, 1fr)',
                                md: 'repeat(3, 1fr)',
                            }}
                            sx={{ my: 10 }}
                        >
                            {SUMMARY.map((item) => (
                                <Box key={item.title} sx={{ textAlign: 'center' }}>
                                    <Stack
                                        alignItems="center"
                                        justifyContent="center"
                                        sx={{
                                            width: 64,
                                            height: 64,
                                            mx: 'auto',
                                            borderRadius: '50%',
                                            color: 'primary.main',
                                            bgcolor: (theme) => `${alpha(theme.palette.primary.main, 0.08)}`,
                                        }}
                                    >
                                        <Iconify icon={item.icon} width={36} />
                                    </Stack>

                                    <Typography variant="h6" sx={{ mb: 1, mt: 3 }}>
                                        {item.title}
                                    </Typography>

                                    <Typography sx={{ color: 'text.secondary' }}>{item.description}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </>
                )}

            </Container>
        </>
    );
}
