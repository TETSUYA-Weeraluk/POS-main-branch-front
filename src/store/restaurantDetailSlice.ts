import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API, path } from "../config/config";
import { Restaurant } from "../pages/restaurant/Restaurant-type";

export interface RestuanrantState {
  restaurant: Restaurant[];
  loading?: "idle" | "pending" | "succeeded" | "failed";
  error?: string;
}

const initialState: RestuanrantState = {
  restaurant: [],
  loading: "idle",
  error: "",
};

export const getOwnerRestaurant = createAsyncThunk<Restaurant[]>(
  "resturant/getOwnerRestaurant",
  async () => {
    const response = await axios.get<Restaurant[]>(
      `${BASE_API}${path.resturant.getOwner}`
    );

    return response.data;
  }
);

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOwnerRestaurant.pending, (state, action) => {
      state.loading = action.payload;
    });
    builder.addCase(getOwnerRestaurant.fulfilled, (state, action) => {
      state.restaurant = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(getOwnerRestaurant.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message || "";
    });
  },
});

// export const { welcomeToHomePage } = restaurantSlice.actions;
export default restaurantSlice.reducer;
