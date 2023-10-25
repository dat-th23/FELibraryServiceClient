import * as React from 'react';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Grid, Button, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { LoadingButton } from '@mui/lab';
// @types
import {
  ICheckoutCardOption,
  ICheckoutPaymentOption,
  ICheckoutDeliveryOption,
  IProductCheckoutState,
} from '../../../../@types/books';
// components
import Iconify from '../../../../components/iconify';
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider from '../../../../components/hook-form';
//
import CheckoutSummary from '../CheckoutSummary';
import CheckoutDelivery from './CheckoutDelivery';
import CheckoutBillingInfo from './CheckoutBillingInfo';
import CheckoutPaymentMethods from './CheckoutPaymentMethods';
import axios from 'axios';
import { useAuthContext } from '../../../../auth/useAuthContext';
import sum from 'lodash/sum';
// ----------------------------------------------------------------------
const PAYMENT_OPTIONS: ICheckoutPaymentOption[] = [
  {
    value: 'paypal',
    title: 'Pay with Paypal',
    description: 'You will be redirected to PayPal website to complete your purchase securely.',
    icons: ['/assets/icons/payments/ic_paypal.svg'],
  },
  // {
  //   value: 'credit_card',
  //   title: 'Credit / Debit Card',
  //   description: 'We support Mastercard, Visa, Discover and Stripe.',
  //   icons: ['/assets/icons/payments/ic_mastercard.svg', '/assets/icons/payments/ic_visa.svg'],
  // },
  {
    value: 'cash',
    title: 'Thanh toán qua ví tiền.',
    description: 'Thanh toán trực tiếp qua ví tiền.',
    icons: [],
  },
];

const CARDS_OPTIONS: ICheckoutCardOption[] = [
  { value: 'ViSa1', label: '**** **** **** 1212 - Jimmy Holland' },
  { value: 'ViSa2', label: '**** **** **** 2424 - Shawn Stokes' },
  { value: 'MasterCard', label: '**** **** **** 4545 - Cole Armstrong' },
];

type Props = {
  checkout: IProductCheckoutState;
  onNextStep: VoidFunction;
  onBackStep: VoidFunction;
  onReset: VoidFunction;
  onGotoStep: (step: number) => void;
  onApplyShipping: (value: number) => void;
};

type FormValuesProps = {
  delivery: number;
  payment: string;
};
const Alert = React.forwardRef(function Alert(props: any, ref: any) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function CheckoutPayment({
  checkout,
  onReset,
  onNextStep,
  onBackStep,
  onGotoStep,
  onApplyShipping,
}: Props) {
  const { cart, totalPrice, totalBorrow, discount, subtotalPrice, subtotalBorrow, billing } = checkout;
  const totalItems = sum(cart.map((item) => item.quantity));
  // console.log(payment)
  const accessToken: any = typeof window !== 'undefined' ? localStorage.getItem('access_Token') : '';
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = React.useState(false);

  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const PaymentSchema = Yup.object().shape({
    payment: Yup.string().required('Payment is required!'),
  });

  const defaultValues = {
    delivery: 123,
    payment: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(PaymentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    try {
      const data1 = await axios.post(`http://localhost:8080/api/orders/add?userId=${user?.id}`,
        {
          fullName: billing?.fullName,
          email: billing?.email,
          phoneNumber: billing?.phoneNumber,
          address: billing?.address,
          status: 'PROCESSING',
          totalDeposit: subtotalPrice,
          totalRent: subtotalBorrow

        }, {
        headers: {
          "Authorization": "Bearer " + accessToken,
        }

      });
      if (data1.status == 200) {
        if (cart.length > 0) {
          for (var i = 0; i < cart.length; i++) {
            const data11 = await axios.post(`http://localhost:8080/api/order_items/add?orderId=${data1.data.orderId}&bookId=` + cart[i].id, {

              quantity: cart[i].quantity,
              borrowedAt: new Date(cart[i].borrow_At),
              returnedAt: new Date(cart[i].return_At),

            }, {
              headers: {
                "Authorization": "Bearer " + accessToken,
              }
            })
            console.log('dta', data11)
            if (data11.data == "Store doesn't have enough book! Please decrease your Borrow Book!") {
              enqueueSnackbar(`${data11.data}`, { variant: 'error' });
            } else {
              const data = await axios.get(`http://localhost:8080/api/orders/checkout-success?orderID=${data1.data.orderId}`, {
                headers: {
                  "Authorization": "Bearer " + accessToken,
                }
              })

              if (data.status == 200) {
                onNextStep()
                onReset()
              }

            }

          }
        }

      } else if (data1.status == 400) {
        enqueueSnackbar(`Số lượng sách không đủ để thuê`, { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar(`Lỗi`, { variant: 'error' });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {/* <CheckoutDelivery onApplyShipping={onApplyShipping} deliveryOptions={DELIVERY_OPTIONS} /> */}

          <CheckoutPaymentMethods
            checkout={checkout}
            cardOptions={CARDS_OPTIONS}
            paymentOptions={PAYMENT_OPTIONS}
            onSubmit={onSubmit}
            onReset={onReset}
            onNextStep={onNextStep}
            sx={{ my: 3 }}
          />

          <Button
            size="small"
            color="inherit"
            onClick={onBackStep}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            Back
          </Button>
        </Grid>

        <Grid item xs={12} md={4}>
          <CheckoutSummary enableDiscount
            totalItems={totalItems}
            total={totalBorrow}
            discount={discount}
            deposittoal={subtotalPrice}
            subtotal={subtotalBorrow}
          />
          {open &&
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                <Typography> Store doesn't have enough book! Please decrease your Borrow Book! 123</Typography>
              </Alert>
            </Snackbar>}
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Hoàn tất đăng ký
          </LoadingButton>
        </Grid>
      </Grid>


    </FormProvider>
  );
}
