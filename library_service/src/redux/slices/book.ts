import sum from 'lodash/sum';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import uniqWith from 'lodash/uniqWith';
import without from 'lodash/without';
import { createSlice, current } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
import { IProductState, ICheckoutCartItem } from '../../@types/books';
//
import { dispatch } from '../store';
import { number } from 'yup';
// ----------------------------------------------------------------------

const initialState: IProductState = {
  isLoading: false,
  error: null,
  products: [],
  product: null,
  checkout: {
    activeStep: 0,
    cart: [],
    subtotalPrice: 0,
    subtotalBorrow: 0,
    totalPrice: 0,
    totalBorrow: 0,
    discount: 0,
    shipping: 0,
    billing: null,
    totalItems: 0,
  },
};

const slice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },

    // GET PRODUCT
    getProductSuccess(state, action) {
      state.isLoading = false;
      state.product = action.payload;
    },

    // CHECKOUT
    getCart(state, action) {
      current(state);
      const cart: ICheckoutCartItem[] = action.payload;

      const totalItems = sum(cart.map((product) => product.quantity));
      const subtotalPrice = sum(cart.map((product) => product.price * product.quantity));
      const subtotalBorrow = sum(
        cart.map((product) => product.borrowPrice * product.quantity * product.countDate)
      );
      state.checkout.cart = cart;
      state.checkout.discount = state.checkout.discount || 0;
      state.checkout.shipping = state.checkout.shipping || 0;
      state.checkout.billing = state.checkout.billing || null;
      state.checkout.subtotalPrice = subtotalPrice;
      state.checkout.subtotalBorrow = subtotalBorrow;
      state.checkout.totalPrice = subtotalPrice - state.checkout.discount;
      state.checkout.totalBorrow = subtotalBorrow - state.checkout.discount;
      state.checkout.totalItems = totalItems;
    },

    addToCart(state, action) {
      current(state);
      const newProduct = action.payload;
      const isEmptyCart = !state.checkout.cart.length;

      if (isEmptyCart) {
        state.checkout.cart = [...current(state.checkout.cart), newProduct];
      } else {
        state.checkout.cart = current(state.checkout.cart).map((product) => {
          const isExisted = product.id === newProduct.id;
          if (isExisted && product.count > product.quantity) {
            return {
              ...product,
              quantity: product.quantity + 1,
            };
          }
        
          return product;
        });
      }
      state.checkout.cart = uniqBy([...state.checkout.cart, newProduct], 'id');
      state.checkout.totalItems = sum(state.checkout.cart.map((product) => product.quantity));
    },

    deleteCart(state, action) {
      const updateCart = state.checkout.cart.filter((product) => product.id !== action.payload);

      state.checkout.cart = updateCart;
    },

    resetCart(state) {
      state.checkout.activeStep = 0;
      state.checkout.cart = [];
      state.checkout.totalPrice = 0;
      state.checkout.totalBorrow = 0;
      state.checkout.subtotalPrice = 0;
      state.checkout.subtotalBorrow = 0;
      state.checkout.discount = 0;
      state.checkout.shipping = 0;
      state.checkout.billing = null;
    },

    backStep(state) {
      state.checkout.activeStep -= 1;
    },

    nextStep(state) {
      state.checkout.activeStep += 1;
    },

    gotoStep(state, action) {
      const step = action.payload;
      state.checkout.activeStep = step;
    },

    increaseQuantity(state, action) {
      const productId = action.payload;

      const updateCart = state.checkout.cart.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    decreaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = state.checkout.cart.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    createBilling(state, action) {
      state.checkout.billing = action.payload;
    },

    applyDiscount(state, action) {
      const discount = action.payload;
      state.checkout.discount = discount;
      state.checkout.totalBorrow = state.checkout.subtotalBorrow - discount;
    },

    applyShipping(state, action) {
      const shipping = action.payload;
      state.checkout.shipping = shipping;
      state.checkout.totalBorrow = state.checkout.totalBorrow - state.checkout.discount + shipping;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  getCart,
  addToCart,
  resetCart,
  gotoStep,
  backStep,
  nextStep,
  deleteCart,
  createBilling,
  applyShipping,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
} = slice.actions;

// ----------------------------------------------------------------------

export function getProducts() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/products', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
      });
      dispatch(slice.actions.getProductsSuccess(response.data.products));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getBook(name: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`http://localhost:8080/api/book/${name}`, {
        // headers: {
        //   'Access-Control-Allow-Origin': '*',
        //   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        // },
      });
      dispatch(slice.actions.getProductSuccess(response?.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
