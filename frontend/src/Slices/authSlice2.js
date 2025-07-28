import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = `http://localhost:8000/${import.meta.env.VITE_API}/users/`;
const userInfo = JSON.parse(localStorage.getItem("userInfo"));

const initialState = {
  userInfo: userInfo ? userInfo : null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const authSlice2 = createSlice({
  name: "auth2",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    clearCredentials: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice2.actions;
export default authSlice2.reducer;
