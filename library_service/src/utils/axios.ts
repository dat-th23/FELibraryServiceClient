import axios, { AxiosRequestConfig } from 'axios';
// config
import { HOST_API_KEY } from '../config';
import {
  AddRole,
  OrderBook,
  Category,
  CreateBook,
  CreateUser,
  FetchBooks,
  FetchCategory,
  PutBook,
  User,
  CreateOrder,
  addOrderItem,
  FetchOrderItem,
} from './type';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API_KEY });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);
const accessToken = localStorage.getItem('accessToken');
const config: AxiosRequestConfig = {
  withCredentials: true,
  headers: { Authorization: 'Bearer ' + accessToken },
};
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);
//Category
export const createCategory = (data: Category) =>
  axiosInstance.post('/api/categories/add', data, config);
export const getCategorys = () => axiosInstance.get<FetchCategory[]>('/api/categories', config);
export const updateCategorys = (data: FetchCategory) =>
  axiosInstance.put('/api/categories/save/' + data.categoryId, data, config);

//User
export const listUsers = () => axiosInstance.get<User[]>('/api/users', config);
export const addRoles = (data: AddRole) => axiosInstance.post('/api/role/addtouser', data, config);
export const createUser = (data: CreateUser) => axiosInstance.post('/api/user/save', data);
export const updateUserMoneyAPI = (data: User) =>
  axiosInstance.put('/api/user/updateMoney?userId=' + data.id, data, config);
//borrowBook order
export const listOrders = () => axiosInstance.get<OrderBook[]>('/api/orders', config);
export const createOrder = (data: CreateOrder) =>
  axiosInstance.post('/api/orders/add?userId=' + data.userId, data, config);
export const updateOrder = (data: OrderBook) =>
  axiosInstance.put('/api/orders/save?orderID=' + data.orderId, data, config);

//order item
export const createOrderItem = (data: addOrderItem) =>
  axiosInstance.post(
    '/api/order_items/add?orderId=' + data.order.orderId.toString() + '&bookId=' + data.bookId,
    {
      quantity: data.quantity,
      borrowedAt: data.borrowedAt,
      returnedAt: data.returnedAt,
    },
    config
  );
export const getOrderItem = (orderId: string) =>
  axiosInstance.get<FetchOrderItem[]>('/api/order_items/order?orderID=' + orderId, config);

//Book
export const createBook = (data: CreateBook) =>
  axiosInstance.post('/api/books/add?categoryId=' + data.categoryId, data);
export const listBooks = () => axiosInstance.get<FetchBooks[]>('/api/books', config);
export const getBookById = (id: number) => axiosInstance.get<FetchBooks>('/api/book/' + id, config);
export const putBook = (data: PutBook) =>
  axiosInstance.put('/api/books/save/' + data.id + '?categoryId=' + data.categoryId, data, config);

export default axiosInstance;
