import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./homeSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    home: homeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
