// @mui
import {
  Box, Card, Typography, Stack, Divider, Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// @types
import { IUserAccountBillingAddress } from '../../../@types/user';
// components
import { useAuthContext } from '../../../auth/useAuthContext';
import FormProvider from '../../../components/hook-form';
import Iconify from '../../../components/iconify';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { fullName } from '../../../_mock/assets/name';

// ----------------------------------------------------------------------

type Props = {
  addressBook: IUserAccountBillingAddress[];
};

export default function AccountBillingAddressBook({ addressBook }: Props) {
  const token = localStorage.getItem('access_Token');
  const { user } = useAuthContext();
  const [show, setShow] = useState<boolean>(false)
  const [orders, setOrders] = useState<any>([]);
  const [orderItem, setOrderItem] = useState<any>([]);

  const handleClose = () => {
    setShow(false)
  }
  useEffect(() => {
    const data = async () => {
      const resApi = await axios.get("http://localhost:8080/api/orders/user-account", {
        headers: {
          "Accept": "application/json",
          "Authorization": "Bearer " + token,

        }
      })
      setOrders(resApi.data)
    }
    data();
  }, [])
  // http://localhost:8080/api/orders/order-detail-user-account?orderId=XbPPKg8Pvf
  const showItem = async (id: any) => {
    setShow(true);
    const resAPI = await axios.get(`http://localhost:8080/api/orders/order-detail-user-account?orderId=${id}`, {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + token,

      }
    })
    setOrderItem(resAPI.data.books)
  }

  return (
    <Card sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="overline" sx={{ color: 'text.secondary' }}>
          Billing Info
        </Typography>
      </Stack>

      <Stack spacing={3} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
        {orders.map((order: any) => {

          return order.totalDeposit !== 0 || order.totalRent !== 0 ?
            (
              <Stack key={order.orderId} spacing={1} sx={{
                backgroundColor:
                  `${order.status}` == 'PENDING' ? '#fff2cc' :
                    `${order.status}` == 'AVAILABLE' ? '#8fce00' : '#f6b26b'
                , padding: 1,
                borderRadius: 2
              }}>

                <Typography variant="subtitle1">Mã Order: {order.orderId}</Typography>
                <Typography variant="body2">
                  <Box component="span" sx={{ color: 'text.secondary', mr: 0.5 }}>
                    Họ tên người thuê:
                  </Box>
                  {`${order.fullName}`}
                </Typography>
                <Typography variant="body2">
                  <Box component="span" sx={{ color: 'text.secondary', mr: 0.5 }}>
                    Địa chỉ:
                  </Box>
                  {`${order.address}`}
                </Typography>

                <Typography variant="body2">
                  <Box component="span" sx={{ color: 'text.secondary', mr: 0.5 }}>
                    Số điện thoại:
                  </Box>
                  {order.phoneNumber}
                </Typography>

                <Typography variant="body2">
                  <Box component="span" sx={{ color: 'text.secondary', mr: 0.5 }}>
                    Tổng tiền thuê:
                  </Box>
                  {order.totalRent}
                </Typography>

                <Typography variant="body2">
                  <Box component="span" sx={{ color: 'text.secondary', mr: 0.5 }}>
                    Tổng tiền cọc:
                  </Box>
                  {order.totalDeposit}
                </Typography>

                <Stack direction="row" spacing={1}>

                  <Button type='submit' size="small" startIcon={<Iconify icon="eva:edit-fill" />}
                    onClick={e => showItem(order.orderId as any)}>
                    Xem chi tiết đơn đặt hàng.
                  </Button>
                </Stack>

              </Stack>
            ) :
            <></>
        }
        )}
      </Stack>

      <Dialog maxWidth="md" open={show} onClose={handleClose}>
        <DialogTitle>Tổng hợp sách đã thuê</DialogTitle>

        <DialogContent dividers>
          <Stack spacing={3}>
            {
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Tên sách</TableCell>
                      <TableCell align="right">Thể loại</TableCell>
                      <TableCell align="right">Tên tác giả</TableCell>
                      <TableCell align="right">Số lượng</TableCell>
                      <TableCell align="right">Giá thuê</TableCell>
                      <TableCell align="right">Giá sách</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderItem.map((item: any) => (
                      <TableRow
                        key={item.detail}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {item.detail}
                        </TableCell>
                        <TableCell align="right">{item?.category?.name}</TableCell>
                        <TableCell align="right">{item?.author}</TableCell>
                        <TableCell align="right">{item?.amount}</TableCell>
                        <TableCell align="right">{item?.borrowPrice}</TableCell>
                        <TableCell align="right">{item?.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            }
          </Stack>
        </DialogContent>


      </Dialog>
    </Card>
  );
}
