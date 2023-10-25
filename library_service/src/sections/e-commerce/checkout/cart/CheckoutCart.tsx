import { useMemo, useState, useEffect } from 'react'
import sum from 'lodash/sum';
import { Link as RouterLink } from 'react-router-dom';
import { useParams } from 'react-router'
// @mui
import { Grid, Card, Button, CardHeader, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../../../../routes/paths';
// @types
import { IProductCheckoutState } from '../../../../@types/books';
// components
import Iconify from '../../../../components/iconify';
import EmptyContent from '../../../../components/empty-content';
//
import CheckoutSummary from '../CheckoutSummary';
import CheckoutCartProductList from './CheckoutCartProductList';

// ----------------------------------------------------------------------

type Props = {
  checkout: IProductCheckoutState;
  onNextStep: VoidFunction;
  onApplyDiscount: (value: number) => void;
  onDeleteCart: (productId: string) => void;
  onIncreaseQuantity: (productId: string) => void;
  onDecreaseQuantity: (productId: string) => void;
};

export default function CheckoutCart({
  checkout,
  onNextStep,
  onApplyDiscount,
  onDeleteCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: Props) {
  const { cart, totalPrice, totalBorrow, discount, subtotalPrice, subtotalBorrow } = checkout;


  const totalItems = sum(cart.map((item) => item.quantity));

  const isEmptyCart = !cart.length;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={9}>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={
              <Typography variant="h6">
                Cart
                <Typography component="span" sx={{ color: 'text.secondary' }}>
                  &nbsp;({totalItems} item)
                </Typography>
              </Typography>
            }
            sx={{ mb: 3 }}
          />

          {!isEmptyCart ? (
            <CheckoutCartProductList
              products={cart}
              onDelete={onDeleteCart}
              onIncreaseQuantity={onIncreaseQuantity}
              onDecreaseQuantity={onDecreaseQuantity}
            />
          ) : (
            <EmptyContent
              title="Cart is empty"
              description="Look like you have no items in your shopping cart."
              img="/assets/illustrations/illustration_empty_cart.svg"
            />
          )}
        </Card>

        <Button
          to={PATH_PAGE.danhmuc}
          component={RouterLink}
          color="inherit"
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
        >
          Continue Shopping
        </Button>
      </Grid>

      <Grid item xs={12} md={3}>
        <CheckoutSummary
          enableDiscount
          totalItems={totalItems}
          total={totalBorrow}
          discount={discount}
          subtotal={subtotalBorrow}
          deposittoal={subtotalPrice}
          onApplyDiscount={onApplyDiscount}
        />
        <Button
          sx={{
            marginBottom: 4
          }}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={!cart.length}
          onClick={onNextStep}
        >
          Check Out
        </Button>
      </Grid>
    </Grid>
  );
}
