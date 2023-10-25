import { useState, useEffect } from 'react'
// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import {
  Box,
  Card,
  Radio,
  Paper,
  CardProps,
  Typography,
  RadioGroup,
  CardHeader,
  CardContent,
  FormControlLabel,
  Button,
} from '@mui/material';
// @types
import { ICheckoutDeliveryOption } from '../../../../@types/product';
// components
import Iconify from '../../../../components/iconify';

import {
  PayPalScriptProvider,
  PayPalHostedFieldsProvider,
  PayPalHostedField,
  PayPalButtons,
  usePayPalHostedFields,
} from "@paypal/react-paypal-js";
// ----------------------------------------------------------------------

interface Props extends CardProps {
  deliveryOptions: ICheckoutDeliveryOption[];
  onApplyShipping: (shipping: number) => void;
}
const SubmitPayment = () => {
  // Here declare the variable containing the hostedField instance
  const hostedFields = usePayPalHostedFields();


};
export default function CheckoutDelivery({ deliveryOptions, onApplyShipping, ...other }: Props) {
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
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: 100,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
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
    });
  };
  //capture likely error
  const onError = (data: any, actions: any) => {
    setErrorMessage("An Error occured with your payment ");
  };


  useEffect(() => {
    if (success) {
      alert("Payment successful!!");
    }
  },
    [success]
  );
  return (
    <Card {...other}>
      <CardHeader title="Delivery options" />

      {/* <CardContent> */}

      {/* <Controller
          name="delivery"
          control={control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              onChange={(event) => {
                const { value } = event.target;
                field.onChange(Number(value));
                onApplyShipping(Number(value));
              }}
            >
              <Box
                gap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
            
              {deliveryOptions.map((option) => (
                  <DeliveryOption
                    key={option.value}
                    option={option}
                    isSelected={field.value === option.value}
                  />
                ))}
              </Box>
            </RadioGroup>
          )}
        /> */}
      {/* </CardContent> */}
      <PayPalScriptProvider
        options={{
          "client-id": "AaRTEM6WAhaRMH_90zLF6-NWPurmwTscLrkjplrnSPuEBO_Wy2jQ0TaIctf2feIF9k5L7ikQokShpdh6",
        }}
      >
        <PayPalButtons
          style={{ layout: "horizontal" }}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </PayPalScriptProvider>
    </Card>
  );
}

// ----------------------------------------------------------------------

type DeliveryOptionProps = {
  option: ICheckoutDeliveryOption;
  isSelected: boolean;
};

function DeliveryOption({ option, isSelected }: DeliveryOptionProps) {
  const { value, title, description } = option;

  return (
    <Paper
      variant="outlined"
      key={value}
      sx={{
        display: 'flex',
        alignItems: 'center',
        transition: (theme) => theme.transitions.create('all'),
        ...(isSelected && {
          boxShadow: (theme) => theme.customShadows.z20,
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
        sx={{ py: 3, px: 2.5, flexGrow: 1, mr: 0 }}
      />
    </Paper>
  );
}
