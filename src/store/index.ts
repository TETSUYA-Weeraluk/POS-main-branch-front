import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./homeSlice";
import { useDispatch } from "react-redux";
import orderReducer from "./orderSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
