import {
  createAsyncThunk,
  createSlice
} from "@reduxjs/toolkit";

import {
  getCart,
  addToCart as addToCartApi,
  updateCartItem as updateCartItemApi,
  removeFromCart as removeFromCartApi
} from "../../services/cartService";

// ===========================
// FORMAT CART ITEMS
// ===========================

const formatCartItems = (items = []) => {
  return items.map((item) => ({
    ...item.product,
    id: item.product._id,
    price: `₹${Number(
      item.product.price
    ).toLocaleString("en-IN")}`,
    quantity: item.quantity
  }));
};

// ===========================
// CALCULATE TOTALS
// ===========================

const calculateTotals = (cartItems) => {
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total +
      Number(
        item.price.replace(/[₹,]/g, "")
      ) * item.quantity,
    0
  );

  return {
    totalItems,
    totalPrice
  };
};

// ===========================
// FETCH CART
// ===========================

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const data = await getCart(token);

      return data.items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ===========================
// ADD TO CART
// ===========================

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, quantity = 1 },
    { getState, rejectWithValue }
  ) => {
    try {
      const token = getState().auth.token;

      const data = await addToCartApi(
        productId,
        quantity,
        token
      );

      return data.cart.items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ===========================
// INCREASE QUANTITY
// ===========================

export const increaseQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async (
    productId,
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState();

      const token = state.auth.token;

      const item = state.cart.cartItems.find(
        (item) => item.id === productId
      );

      if (!item) {
        throw new Error("Product not found in cart");
      }

      const newQuantity = item.quantity + 1;

      const data = await updateCartItemApi(
        productId,
        newQuantity,
        token
      );

      return data.cart.items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ===========================
// DECREASE QUANTITY
// ===========================

export const decreaseQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async (
    productId,
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState();

      const token = state.auth.token;

      const item = state.cart.cartItems.find(
        (item) => item.id === productId
      );

      if (!item) {
        throw new Error("Product not found in cart");
      }

      const newQuantity = item.quantity - 1;

      // If quantity becomes zero,
      // remove the product from backend.
      if (newQuantity === 0) {
        const data = await removeFromCartApi(
          productId,
          token
        );

        return data.cart.items;
      }

      const data = await updateCartItemApi(
        productId,
        newQuantity,
        token
      );

      return data.cart.items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ===========================
// REMOVE FROM CART
// ===========================

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (
    productId,
    { getState, rejectWithValue }
  ) => {
    try {
      const token = getState().auth.token;

      const data = await removeFromCartApi(
        productId,
        token
      );

      return data.cart.items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ===========================
// INITIAL STATE
// ===========================

const initialState = {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
  loading: false,
  error: null
};

// ===========================
// CART SLICE
// ===========================

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    }
  },

  extraReducers: (builder) => {
    builder

      // ===========================
      // FETCH CART
      // ===========================

      .addCase(
        fetchCart.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchCart.fulfilled,
        (state, action) => {
          state.loading = false;

          state.cartItems =
            formatCartItems(action.payload);

          const totals = calculateTotals(
            state.cartItems
          );

          state.totalItems =
            totals.totalItems;

          state.totalPrice =
            totals.totalPrice;
        }
      )

      .addCase(
        fetchCart.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // ===========================
      // ADD TO CART
      // ===========================

      .addCase(
        addToCart.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        addToCart.fulfilled,
        (state, action) => {
          state.loading = false;

          state.cartItems =
            formatCartItems(action.payload);

          const totals = calculateTotals(
            state.cartItems
          );

          state.totalItems =
            totals.totalItems;

          state.totalPrice =
            totals.totalPrice;
        }
      )

      .addCase(
        addToCart.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // ===========================
      // INCREASE QUANTITY
      // ===========================

      .addCase(
        increaseQuantity.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        increaseQuantity.fulfilled,
        (state, action) => {
          state.loading = false;

          state.cartItems =
            formatCartItems(action.payload);

          const totals = calculateTotals(
            state.cartItems
          );

          state.totalItems =
            totals.totalItems;

          state.totalPrice =
            totals.totalPrice;
        }
      )

      .addCase(
        increaseQuantity.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // ===========================
      // DECREASE QUANTITY
      // ===========================

      .addCase(
        decreaseQuantity.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        decreaseQuantity.fulfilled,
        (state, action) => {
          state.loading = false;

          state.cartItems =
            formatCartItems(action.payload);

          const totals = calculateTotals(
            state.cartItems
          );

          state.totalItems =
            totals.totalItems;

          state.totalPrice =
            totals.totalPrice;
        }
      )

      .addCase(
        decreaseQuantity.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // ===========================
      // REMOVE FROM CART
      // ===========================

      .addCase(
        removeFromCart.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        removeFromCart.fulfilled,
        (state, action) => {
          state.loading = false;

          state.cartItems =
            formatCartItems(action.payload);

          const totals = calculateTotals(
            state.cartItems
          );

          state.totalItems =
            totals.totalItems;

          state.totalPrice =
            totals.totalPrice;
        }
      )

      .addCase(
        removeFromCart.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  }
});

export const { clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;