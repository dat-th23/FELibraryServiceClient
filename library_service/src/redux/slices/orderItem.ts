import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createOrderItem as createOrderItemAPI,
  getOrderItem as getOrderItemAPI,
} from 'src/utils/axios';
import { addOrderItem, FetchBooks, FetchOrderItem, OrderBook } from 'src/utils/type';

export interface addOrdersState {
  orderItem: FetchOrderItem[];
}

const initialState: addOrdersState = {
  orderItem: [],
};

export const CreateOrderItemThunk = createAsyncThunk(
  'create/order_item',
  async (data: addOrderItem) => {
    return createOrderItemAPI(data);
  }
);

export const FetchOrderItemThunk = createAsyncThunk('fetch/order_item', async (orderId: string) => {
  return getOrderItemAPI(orderId);
});

export const orderItemSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrderItem: (state, action: any) => {},
  },
  extraReducers(builder) {
    builder
      .addCase(FetchOrderItemThunk.fulfilled, (state, action) => {
        state.orderItem = action.payload.data;
      })
      .addCase(CreateOrderItemThunk.fulfilled, (state, action) => {
        state.orderItem.push(action.payload.data);
      });
  },
});

export default orderItemSlice.reducer;
