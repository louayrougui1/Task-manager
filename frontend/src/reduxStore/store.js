import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slices/authSlice";
import taskReducer from "../Slices/taskSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
  },
});
