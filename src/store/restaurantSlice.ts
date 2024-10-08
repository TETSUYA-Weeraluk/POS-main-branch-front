import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API, path } from "../config/config";
import { Restaurant } from "../pages/restaurant/Restaurant-type";

export interface CreateRestaurant {
  name: string;
  image?: string;
  userId: string;
}

export interface UpdateRestaurant {
  name: string;
  image?: string;
  id: string;
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

export const getOwnerRestaurant = createAsyncThunk<Restaurant[]>(
  "resturant/getOwnerRestaurant",
  async () => {
    const response = await axios.get<Restaurant[]>(
      `${BASE_API}${path.resturant.getOwner}`
    );

    return response.data;
  }
);

export const createRestaurant = createAsyncThunk<Restaurant, CreateRestaurant>(
  "resturant/createRestaurant",
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
  "resturant/removeRestaurant",
  async (id: string) => {
    await axios.delete<Restaurant>(`${BASE_API}${path.resturant.delete}/${id}`);

    return id;
  }
);

export const updateRestaurant = createAsyncThunk<Restaurant, UpdateRestaurant>(
  "resturant/updateRestaurant",
  async (params: UpdateRestaurant) => {
    const response = await axios.patch<Restaurant>(
      `${BASE_API}${path.resturant.update}/${params.id}`,
      {
        name: params.name,
        image: params.image,
      }
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
    builder.addCase(updateRestaurant.pending, (state, action) => {
      state.loading = action.payload;
    });
    builder.addCase(updateRestaurant.fulfilled, (state, action) => {
      const newRes = action.payload;
      const index = state.restaurant.findIndex((item) => item.id === newRes.id);

      state.restaurant[index] = newRes;

      state.loading = "succeeded";
    });
    builder.addCase(updateRestaurant.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message || "";
    });
  },
});

// export const { welcomeToHomePage } = restaurantSlice.actions;
export default restaurantSlice.reducer;
