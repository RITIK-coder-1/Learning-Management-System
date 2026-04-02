/* ----------------------------------------------------------------------------------------------
baseQuery.js
This base query file to set up the base url and to look for the token expiry 
------------------------------------------------------------------------------------------------- */

import { disableUser } from "@/features/authSlice";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

// the API base for every network call
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_RENDER_SERVER,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// the wrapper to look for token expiration
export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    toast.error("Your token expired. Please login again.");

    // Clear Redux State
    api.dispatch(disableUser());
  }
  return result;
};
