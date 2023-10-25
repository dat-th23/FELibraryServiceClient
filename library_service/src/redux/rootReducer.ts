import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';
import bookReducer from './slices/book';
// import orderItemReducer from './slices/orderiItem';
import userReducer from './slices/user';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};
const bookPersistConfig = {
  key: 'book',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  users: userReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  // orderItem: orderItemReducer,
  product: persistReducer(productPersistConfig, productReducer),
  book: persistReducer(bookPersistConfig, bookReducer),
});

export { rootPersistConfig, rootReducer };
