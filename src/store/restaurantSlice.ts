import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API, path } from "../config/config";
import { Restaurant } from "../pages/restaurant/Restaurant-type";

export interface CreateRestaurant {
  name: string;
  image?: string;
  userId: string;
}

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

export const getOwnerRestaurant = createAsyncThunk<Restaurant[], string>(
  "auth/getRestaurant",
  async (id: string) => {
    const response = await axios.get<Restaurant[]>(
      `${BASE_API}${path.resturant.getOwner}/${id}`
    );

    return response.data;
  }
);

export const createRestaurant = createAsyncThunk<Restaurant, CreateRestaurant>(
  "auth/createRestaurant",
  async (params: CreateRestaurant) => {
    const response = await axios.post<Restaurant>(
      `${BASE_API}${path.resturant.create}`,
      {
        ...params,
      }
    );

    return response.data;
  }
);

export const removeRestaurant = createAsyncThunk<string, string>(
  "auth/removeRestaurant",
  async (id: string) => {
    await axios.delete<Restaurant>(`${BASE_API}${path.resturant.delete}/${id}`);

    return id;
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
    builder.addCase(createRestaurant.pending, (state, action) => {
      state.loading = action.payload;
    });
    builder.addCase(createRestaurant.fulfilled, (state, action) => {
      state.restaurant = state.restaurant.concat(action.payload);
      console.log(state.restaurant);
      state.loading = "succeeded";
    });
    builder.addCase(createRestaurant.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message || "";
    });
    builder.addCase(removeRestaurant.pending, (state, action) => {
      state.loading = action.payload;
    });
    builder.addCase(removeRestaurant.fulfilled, (state, action) => {
      state.restaurant = state.restaurant.filter(
        (item) => item.id !== action.payload
      );
      console.log(state.restaurant);
      state.loading = "succeeded";
    });
    builder.addCase(removeRestaurant.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message || "";
    });
  },
});

// export const { welcomeToHomePage } = restaurantSlice.actions;
export default restaurantSlice.reducer;
