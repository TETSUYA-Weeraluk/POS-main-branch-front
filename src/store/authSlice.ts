import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API } from "../config/config";

export interface authState {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
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

export interface LoginParams {
  email: string;
  password: string;
}

const initialState: authState = {
  user: {
    id: "",
    name: "",
    email: "",
    role: "",
  },
  loading: "idle",
  error: "",
};

export const login = createAsyncThunk<LoginResponse, LoginParams>(
  "auth/login",
  async (params: LoginParams) => {
    const response = await axios.post<LoginResponse>(`${BASE_API}auth/login`, {
      email: params.email,
      password: params.password,
    });

    return response.data;
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (id: string) => {
    try {
      const response = await axios.get<{
        message: string;
        error: string;
        statusCode: number;
        id: string;
        name: string;
        email: string;
        role: string;
      }>(`${BASE_API}users/${id}`);
      return response.data;
    } catch (error) {
      localStorage.removeItem("token-pos");
      return initialState.user;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.loading = action.payload;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = "succeeded";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message || "";
    });
    builder.addCase(fetchUser.pending, (state, action) => {
      state.loading = action.payload;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message || "";
    });
  },
});

// export const { welcomeToHomePage } = homeSlice.actions;
export default authSlice.reducer;
