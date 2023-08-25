import { configureStore } from "@reduxjs/toolkit";
import productDetails from "./ProductSlice";
import UserDetail from "./UserAuth";
import CartDetails from "./Cart";
import orderdetails from "./Orders";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import persistReducer from "redux-persist/es/persistReducer";
const userPersistConfig = {
  key: "user",
  storage,
};


const persistedUserReducer = persistReducer(userPersistConfig, UserDetail);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    AllProducts: productDetails,
    cart: CartDetails,
    orders: orderdetails,
  },
  middleware:(getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck:{
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
