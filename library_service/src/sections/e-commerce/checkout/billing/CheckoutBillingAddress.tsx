import { useEffect, useState, useCallback } from 'react';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Grid, Card, Button, Typography, Stack, Box } from '@mui/material';
// @types
import { ICheckoutBillingAddress, IProductCheckoutState } from '../../../../@types/books';
// _mock
import { _addressBooks } from '../../../../_mock/arrays';
// components
import Iconify from '../../../../components/iconify';
import { LoadingButton } from '@mui/lab';

//
import FormProvider, {
  RHFTextField,
} from '../../../../components/hook-form';
import CheckoutSummary from '../CheckoutSummary';
import CheckoutBillingNewAddressForm from './CheckoutBillingNewAddressForm';
import axios from 'axios';
import { useSnackbar } from '../../../../components/snackbar';
import { useAuthContext } from '../../../../auth/useAuthContext';
import { useDispatch, useSelector } from '../../../../redux/store';
import sum from 'lodash/sum';
import {
  nextStep,
} from '../../../../redux/slices/book';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// ----------------------------------------------------------------------
interface FormValuesProps extends ICheckoutBillingAddress {
  address: string;
  phoneNumber: string;
  email: string;
  fullName: string;
  status: string;
}

type Props = {
  checkout: IProductCheckoutState;
  onBackStep: VoidFunction;
  onNextStep: VoidFunction;
  onCreateBilling: (address: ICheckoutBillingAddress) => void;
  accessToken: string
};

export default function CheckoutBillingAddress({ onBackStep, onNextStep, onCreateBilling, checkout, accessToken }: Props) {
  const { cart, totalPrice, totalBorrow, discount, subtotalPrice, subtotalBorrow } = checkout;
  console.log('checkout', checkout)
  const totalItems = sum(cart.map((item) => item.quantity));
  const { user } = useAuthContext();


  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleOpen = async () => {
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);

  };

  const NewAddressSchema = Yup.object().shape({
    fullName: Yup.string().required('Fullname is required'),
    phoneNumber: Yup.string().required('Phone is required'),
    address: Yup.string().required('Address is required'),
    email: Yup.string().required('Email is required'),
  });

  const defaultValues = {
    fullName: user?.name ? user?.name : '',
    phoneNumber: user?.phoneNumber ? user?.phoneNumber : '',
    address: user?.address ? user?.address : '',
    email: user?.email ? user?.email : '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewAddressSchema),
    defaultValues,
  });


  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      onCreateBilling({
        fullName: data?.fullName,
        email: data?.email,
        phoneNumber: data?.phoneNumber,
        address: data?.address,
        status: 'PROCESSING'
      });
      // dispatch(nextStep());
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
                <RHFTextField name="fullname" label="Full Name" defaultValue={user?.username} />
                <RHFTextField name="email" label="Email" defaultValue={user?.email} />


              </Box>

              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
                <RHFTextField name="phoneNumber" label="Phone Number" defaultValue={user?.phoneNumber} />
                <RHFTextField name="address" label="Address" defaultValue={user?.address} />

              </Box>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Xác nhận thông tin
              </LoadingButton>
            </Stack>

          </FormProvider>
          <Stack sx={{ mt: 3 }} direction="row" justifyContent="space-between">
            <Button
              size="small"
              color="inherit"
              onClick={onBackStep}
              startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            >
              Back
            </Button>

          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <CheckoutSummary enableDiscount
            totalItems={totalItems}
            total={totalBorrow}
            discount={discount}
            deposittoal={subtotalPrice}
            subtotal={subtotalBorrow}
          />



        </Grid>
      </Grid>

      {/* <CheckoutBillingNewAddressForm
        open={open}
        onClose={handleClose}
        onCreateBilling={onCreateBilling}
      /> */}
    </>
  );
}


