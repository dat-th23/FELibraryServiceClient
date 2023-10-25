// @mui
import { Table, TableBody, TableContainer } from '@mui/material';
// @types
import { ICheckoutCartItem } from '../../../../@types/books';
// components
import Scrollbar from '../../../../components/scrollbar';
import { TableHeadCustom } from '../../../../components/table';
//
import CheckoutCartProduct from './CheckoutCartProduct';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'product', label: 'Tên sách' },
  { id: 'price', label: 'Tiền thuê' },
  { id: 'quantity', label: 'Số lượng' },
  { id: 'countDate', label: 'Số ngày thuê' },
  { id: 'borrow_At', label: 'Ngày thuê' },
  { id: 'return_At', label: 'Ngày trả' },
  { id: '' },
];

// ----------------------------------------------------------------------

type Props = {
  products: ICheckoutCartItem[];
  onDelete: (id: string) => void;
  onDecreaseQuantity: (id: string) => void;
  onIncreaseQuantity: (id: string) => void;
};

export default function CheckoutCartProductList({
  products,
  onDelete,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: Props) {
  console.log(products);
  return (
    <TableContainer sx={{ overflow: 'unset' }}>
      <Scrollbar>
        <Table sx={{ minWidth: 720 }}>
          <TableHeadCustom headLabel={TABLE_HEAD} />

          <TableBody>
            {products.map((row) => (
              <CheckoutCartProduct
                key={row.id}
                row={row}
                onDelete={() => onDelete(row.id)}
                onDecrease={() => onDecreaseQuantity(row.id)}
                onIncrease={() => onIncreaseQuantity(row.id)}
              />
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );
}
