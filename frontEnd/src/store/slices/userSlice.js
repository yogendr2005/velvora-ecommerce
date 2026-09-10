import {
  createAsyncThunk,
  createSlice
} from "@reduxjs/toolkit";

import { getMyOrders } from "../../services/orderService";

// ===========================
// FETCH MY ORDERS
// ===========================

export const fetchOrders = createAsyncThunk(
  "user/fetchOrders",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const data = await getMyOrders(token);

      return data.orders;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ===========================
// INITIAL STATE
// ===========================

const initialState = {
  profile: {},
  orders: [],
  users: [],
  ordersLoading: false,
  ordersError: null
};

// ===========================
// USER SLICE
// ===========================

const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },

    updateProfile: (state, action) => {
      state.profile = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder

      // ===========================
      // FETCH ORDERS
      // ===========================

      .addCase(
        fetchOrders.pending,
        (state) => {
          state.ordersLoading = true;
          state.ordersError = null;
        }
      )

      .addCase(
        fetchOrders.fulfilled,
        (state, action) => {
          state.ordersLoading = false;
          state.orders = action.payload;
        }
      )

      .addCase(
        fetchOrders.rejected,
        (state, action) => {
          state.ordersLoading = false;
          state.ordersError = action.payload;
        }
      );
  }
});

export const {
  addUser,
  updateProfile
} = userSlice.actions;

export default userSlice.reducer;