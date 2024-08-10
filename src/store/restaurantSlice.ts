import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API, path } from "../config/config";
import { Restaurant } from "../pages/restaurant/Restaurant-type";

export interface RestuanrantState {
  restaurant: Restaurant[];
  loading?: "idle" | "pending" | "succeeded" | "failed";
  error?: string;
}

export interface LoginResponse {
  token: string;
  message: string;
  status: number;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

const initialState: RestuanrantState = {
  restaurant: [],
  loading: "idle",
  error: "",
};

export const getRestaurant = createAsyncThunk<Restaurant[], string>(
  "auth/getRestaurant",
  async (id: string) => {
    const response = await axios.post<Restaurant[]>(
      `${BASE_API}${path.resturant}/${id}`
    );

    return response.data;
  }
);

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRestaurant.pending, (state, action) => {
      state.loading = action.payload;
    });
    builder.addCase(getRestaurant.fulfilled, (state, action) => {
      state.restaurant = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(getRestaurant.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message || "";
    });
  },
});

// export const { welcomeToHomePage } = restaurantSlice.actions;
export default restaurantSlice.reducer;
