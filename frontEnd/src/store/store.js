import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import wishlistReducer from "./slices/wishlistSlice";
import userReducer from "./slices/userSlice";
import categoryReducer from "./slices/categorySlice";

const cartPersistConfig = {
  key: "cart",
  storage,
};

const authPersistConfig = {
  key: "auth",
  storage,
};

const userPersistConfig = {
  key: "user",
  storage,
};

const persistedUserReducer = persistReducer(
  userPersistConfig,
  userReducer
);

const persistedCartReducer = persistReducer(
  cartPersistConfig,
  cartReducer
);

const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authReducer
);

const wishlistPersistConfig = {
  key: "wishlist",
  storage,
};

const persistedWishlistReducer = persistReducer(
  wishlistPersistConfig,
  wishlistReducer
);

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: persistedCartReducer,
    auth: persistedAuthReducer,
    wishlist: persistedWishlistReducer,
    user: persistedUserReducer,
    categories: categoryReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);