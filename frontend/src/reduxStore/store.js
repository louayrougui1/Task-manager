import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slices/authSlice";
import authReducer2 from "../Slices/authSlice2";
import taskReducer from "../Slices/taskSlice";
import { apiSlice } from "../Slices/apiSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
    authtwo: authReducer2,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
