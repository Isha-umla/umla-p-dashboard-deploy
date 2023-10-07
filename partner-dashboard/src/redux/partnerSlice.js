import { createSlice } from "@reduxjs/toolkit";

const partnerSlice = createSlice({
  name: "partner",

  initialState: {
    isFetching: false,
    currentPartner: null,
    error: null,
  },

  reducers: {
    fetchingStart: (initialState) => {
      initialState.isFetching = true;
    },

    fetchingSuccess: (initialState, action) => {
      initialState.currentPartner = action.payload;
      initialState.isFetching = false;
    },

    fetchingFailure: (initialState, action) => {
      initialState.error = action.payload;
      initialState.isFetching = false;
    },
  },
});

export const { fetchingStart, fetchingSuccess, fetchingFailure } =
  partnerSlice.actions;

export default partnerSlice.reducer;
