import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { sellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";
import { eventReducer } from "./reducers/event";
import { wishlistReducer } from "./reducers/wishList";
import reviewReducer from './reducers/reviewSlice';
import messagesReducer from './reducers/messages';
import messagesSellerReducer from './reducers/messagesSeller';

export const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    product: productReducer,
    event: eventReducer,
    wishlist: wishlistReducer,
    review: reviewReducer,
    messages: messagesReducer,
    messagesSeller: messagesSellerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});
