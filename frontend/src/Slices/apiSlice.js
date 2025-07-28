import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = `http://localhost:8000/${import.meta.env.VITE_API}/users/`;

const baseQuery = fetchBaseQuery({ baseUrl: API_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
