// @mui
import { useEffect, useState } from 'react'
import { Box, Stack, Divider, TableRow, TableCell, Typography, IconButton } from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// @types
import { Controller, useForm } from 'react-hook-form';
import { ICheckoutCartItem } from '../../../../@types/books';
// components

import Iconify from '../../../../components/iconify';
import { ColorPreview } from '../../../../components/color-utils';
import { IncrementerButton } from '../../../../components/custom-input';
import { DatePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';

import moment from 'moment';
// ----------------------------------------------------------------------

type CheckoutProductListRowProps = {
  row: ICheckoutCartItem;
  onDelete: VoidFunction;
  onDecrease: VoidFunction;
  onIncrease: VoidFunction;
};

export default function CheckoutCartProduct({
  row,
  onDelete,
  onDecrease,
  onIncrease,
}: CheckoutProductListRowProps) {
  const { detail, borrowPrice, price, id, quantity, available, borrow_At, return_At, subtotalPrice, subtotalBorrow, countDate, count } = row;
  const now = new Date();
  const [edit_check_date, set_edit_check_date] = useState<any | null>(new Date(borrow_At));
  const [edit_return_date, set_edit_return_date] = useState<any | null>(new Date(return_At));

  return (
    <TableRow>
      <TableCell>
        <Typography variant="subtitle2" sx={{ maxWidth: 240 }}>
          {detail}
        </Typography>

      </TableCell>

      <TableCell>{fCurrency(borrowPrice)}</TableCell>

      <TableCell>
        <Box sx={{ width: 96, textAlign: 'right' }}>
          <IncrementerButton
            quantity={quantity}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
            disabledDecrease={quantity <= 1}
            disabledIncrease={quantity >= count}
          />
        </Box>
      </TableCell>
      <TableCell>{countDate}</TableCell>

      <TableCell align="left">
        <DatePicker
          disabled
          label="Ngày thuê"
          minDate={now}
          value={edit_check_date}
          onChange={(newValue) => {
            set_edit_check_date(newValue)
          }}
          renderInput={(params) => (
            <TextField {...params} />
          )}
        />
        {/* )}
      /> */}
      </TableCell>
      <TableCell align="left">

        <DatePicker
          disabled
          label="Ngày trả"
          minDate={now}
          value={edit_return_date}
          onChange={(newValue) => {
            set_edit_return_date(newValue)
          }}
          renderInput={(params) => (
            <TextField {...params} />
          )}
        />


      </TableCell>

      <TableCell align="right">
        <IconButton onClick={onDelete}>
          <Iconify icon="eva:trash-2-outline" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
