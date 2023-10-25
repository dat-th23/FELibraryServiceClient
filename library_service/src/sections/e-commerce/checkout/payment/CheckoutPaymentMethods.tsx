import { useState, useEffect } from 'react';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import {
  Box,
  Card,
  Radio,
  Stack,
  Paper,
  Button,
  TextField,
  CardProps,
  Typography,
  RadioGroup,
  CardHeader,
  CardContent,
  FormHelperText,
  FormControlLabel,
} from '@mui/material';
// @types
import { ICheckoutCardOption, ICheckoutPaymentOption } from '../../../../@types/product';
// components
import Image from '../../../../components/image';
import Iconify from '../../../../components/iconify';
// section
import { PaymentNewCardDialog } from '../../../payment';

import {
  PayPalScriptProvider,
  PayPalButtons,
} from "@paypal/react-paypal-js";
import { useAuthContext } from '../../../../auth/useAuthContext';
import axios from 'axios';
// ----------------------------------------------------------------------

interface Props extends CardProps {
  paymentOptions: ICheckoutPaymentOption[];
  cardOptions: ICheckoutCardOption[];
  onSubmit: any;
  checkout: any;
  onReset: any;
  onNextStep: any;
}

export default function CheckoutPaymentMethods({ paymentOptions, cardOptions, checkout, onReset, onNextStep, ...other }: Props) {
  const { cart, totalPrice, totalBorrow, discount, subtotalPrice, subtotalBorrow, billing } = checkout;
  const { control } = useFormContext();
  const accessToken: any = typeof window !== 'undefined' ? localStorage.getItem('access_Token') : '';
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = async () => {
    try {
      const data1 = await axios.post(`http://localhost:8080/api/orders/add?userId=${user?.id}`,
        {
          fullName: billing?.fullName,
          email: billing?.email,
          phoneNumber: billing?.phoneNumber,
          address: billing?.address,
          status: 'PROCESSING',
          type: "PAYPAL",
          totalDeposit: subtotalPrice,

        }, {
        headers: {
          "Authorization": "Bearer " + accessToken
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
                "Authorization": "Bearer " + accessToken
              }
            })
            if (data11.data == "Store doesn't have enough book! Please decrease your Borrow Book!") {
              // enqueueSnackbar(`${data11.data}`, { variant: 'error' });
            } else {
              const data = await axios.get(`http://localhost:8080/api/orders/checkout-success?orderID=${data1.data.orderId}`, {
                headers: {
                  "Authorization": "Bearer " + accessToken
                }
              })
              if (data.status == 200) {
                // onNextStep()
                onReset()
              }

            }

          }
        }

      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card {...other}>
        <CardHeader title="Payment options" />

        <CardContent>
          <Controller
            name="payment"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <RadioGroup row {...field}>
                  <Stack spacing={3} sx={{ width: 1 }}>
                    {paymentOptions.map((option) => (
                      <PaymentOption
                        key={option.title}
                        option={option}
                        cardOptions={cardOptions}
                        hasChild={option.value === 'paypal'}
                        isSelected={field.value === option.value}
                        isCreditMethod={
                          option.value === 'paypal' && field.value === 'paypal'
                        }
                        onOpen={handleOpen}
                        onSubmit={onSubmit}
                        onReset={onReset}
                        onNextStep={onNextStep}
                        subtotalBorrow={subtotalBorrow}
                      />
                    ))}
                  </Stack>
                </RadioGroup>

                {!!error && (
                  <FormHelperText error sx={{ pt: 1, px: 2 }}>
                    {error.message}
                  </FormHelperText>
                )}
              </>
            )}
          />
        </CardContent>
      </Card>

      <PaymentNewCardDialog open={open} onClose={handleClose} />
    </>
  );
}

// ----------------------------------------------------------------------

type PaymentOptionProps = {
  option: ICheckoutPaymentOption;
  cardOptions: ICheckoutCardOption[];
  hasChild: boolean;
  isSelected: boolean;
  isCreditMethod: boolean;
  onOpen: VoidFunction;
  onSubmit: VoidFunction
  subtotalBorrow: number;
  onReset: any;
  onNextStep: any;
};

function PaymentOption({
  option,
  cardOptions,
  hasChild,
  isSelected,
  isCreditMethod,
  onOpen,
  onSubmit,
  subtotalBorrow,
  onReset,
  onNextStep,

}: PaymentOptionProps) {
  const { value, title, icons, description } = option;
  const { control } = useFormContext();
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);

  // creates a paypal order
  const createOrder = (data: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            intent: "Thuê sách",
            amount: {
              currency_code: "USD",
              value: `${subtotalBorrow}`,
            },
          },
        ],
      })
      .then((orderID: any) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(function (details: any) {
      const { payer } = details;
      setSuccess(true);
      onSubmit();
    });
  };
  //capture likely error
  const onError = (data: any, actions: any) => {
    setErrorMessage("An Error occured with your payment ");
  };


  useEffect(() => {
    setTimeout(() => {
      if (success) {
        onReset();
        onNextStep();
      }
    }, 4000)
  },
    [success]
  );
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          display: 'flex',
          alignItems: 'center',
          transition: (theme) => theme.transitions.create('all'),
          ...(isSelected && {
            boxShadow: (theme) => theme.customShadows.z20,
          }),
          ...(hasChild && {
            flexWrap: 'wrap',
          }),
        }}
      >
        <FormControlLabel
          value={value}
          control={<Radio checkedIcon={<Iconify icon="eva:checkmark-circle-2-fill" />} />}
          label={
            <Box sx={{ ml: 1 }}>
              <Typography variant="subtitle2">{title}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {description}
              </Typography>
            </Box>
          }
          sx={{ py: 3, pl: 2.5, flexGrow: 1, mr: 0 }}
        />

        <Stack
          direction="row"
          spacing={1}
          flexShrink={0}
          sx={{
            pr: 2.5,
            display: {
              xs: 'none',
              sm: 'inline-flex',
            },
          }}
        >
          {icons.map((icon) => (
            <Image key={icon} alt="logo card" src={icon} />
          ))}
        </Stack>

        {isCreditMethod && (
          <Stack
            alignItems="flex-start"
            sx={{
              px: 3,
              width: 1,
              my: 3
            }}
          >
            <Card sx={{ width: '100%', height: '50px' }}>
              <PayPalScriptProvider

                options={{
                  "client-id": "AaRTEM6WAhaRMH_90zLF6-NWPurmwTscLrkjplrnSPuEBO_Wy2jQ0TaIctf2feIF9k5L7ikQokShpdh6",
                  currency: "USD",

                }}
              >
                <PayPalButtons
                  style={{ layout: "horizontal" }}
                  createOrder={createOrder}
                  onApprove={onApprove}
                />
              </PayPalScriptProvider>
            </Card>

          </Stack>
        )}
      </Paper>
    </>
  );
}
