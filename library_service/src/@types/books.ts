// ----------------------------------------------------------------------

export type IProductReview = {
  id: string;
  name: string;
  avatarUrl: string;
  comment: string;
  rating: number;
  isPurchased: boolean;
  helpful: number;
  postedAt: Date | string | number;
};
interface cate {
  categoryId: number;
  name?: string;
}
export type IBook = {
  id: string;
  amount: number;
  author: string;
  category: cate;
  borrowPrice: number;
  detail: string;
  language: string;
  price: number;
  publisher: string;
  status: string;
  subject: string;
  thumbnail: string;
  title: string;
  category_id: number;
};

export type IProductFilter = {
  gender: string[];
  category: string;
  colors: string[];
  priceRange: number[];
  rating: string;
  sortBy: string;
};

// ----------------------------------------------------------------------

export type ICheckoutCartItem = {
  id: string;
  detail: string;
  available: number;
  price: number;
  count: number;
  borrowPrice: number;
  quantity: number;
  subtotalBorrow: number;
  subtotalPrice: number;
  borrow_At: number;
  return_At: number;
  countDate: number;
};

export type ICheckoutBillingAddress = {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  status: string;
};

export type ICheckoutDeliveryOption = {
  value: number;
  title: string;
  description: string;
};

export type ICheckoutPaymentOption = {
  value: string;
  title: string;
  description: string;
  icons: string[];
};

export type ICheckoutCardOption = {
  value: string;
  label: string;
};

// ----------------------------------------------------------------------

export type IProductCheckoutState = {
  activeStep: number;
  cart: ICheckoutCartItem[];
  subtotalPrice: number;
  subtotalBorrow: number;
  totalBorrow: number;
  totalPrice: number;
  discount: number;
  shipping: number;
  billing: ICheckoutBillingAddress | null;
  totalItems: number;
};

export type IProductState = {
  isLoading: boolean;
  error: Error | string | null;
  products: IBook[];
  product: IBook | null;
  checkout: IProductCheckoutState;
};
