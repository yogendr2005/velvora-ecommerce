import {
  createAsyncThunk,
  createSlice
} from "@reduxjs/toolkit";

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist
} from "../../services/wishlistService";

// FORMAT WISHLIST PRODUCTS

const formatWishlist = (products = []) => {
  return products.map((product) => ({
    ...product,
    id: product._id,
    price: `₹${Number(
      product.price
    ).toLocaleString("en-IN")}`
  }));
};

// FETCH WISHLIST

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const data = await getWishlist(token);

      return data.wishlist;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// TOGGLE WISHLIST

export const toggleWishlist = createAsyncThunk(
  "wishlist/toggleWishlist",
  async (product, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const token = state.auth.token;

      const exists = state.wishlist.wishlist.some(
        (item) => item.id === product.id
      );

      let data;

      if (exists) {
        data = await removeFromWishlist(
          product.id,
          token
        );
      } else {
        data = await addToWishlist(
          product.id,
          token
        );
      }

      return data.wishlist;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// INITIAL STATE

const initialState = {
  wishlist: [],
  loading: false,
  error: null
};

// WISHLIST SLICE

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH WISHLIST

      .addCase(
        fetchWishlist.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchWishlist.fulfilled,
        (state, action) => {
          state.loading = false;

          state.wishlist =
            formatWishlist(action.payload);
        }
      )

      .addCase(
        fetchWishlist.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // TOGGLE WISHLIST

      .addCase(
        toggleWishlist.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        toggleWishlist.fulfilled,
        (state, action) => {
          state.loading = false;

          state.wishlist =
            formatWishlist(action.payload);
        }
      )

      .addCase(
        toggleWishlist.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  }
});

export default wishlistSlice.reducer;