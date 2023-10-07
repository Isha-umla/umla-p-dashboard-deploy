import { createSlice } from "@reduxjs/toolkit";

const allotTableSlice = createSlice({
  name: "allotTable",

  initialState: {
    isFetching: false,
    arrival: {},
  },

  reducers: {
    allotTablesStart: (initialState) => {
      initialState.isFetching = true;
    },

    allotTablesSuccess: (initialState, action) => {
      initialState.arrival = action.payload;
      initialState.isFetching = false;
    },

    allotTablesFailure: (initialState) => {
      initialState.isFetching = false;
    },
  },
});

export const { allotTablesStart, allotTablesSuccess, allotTablesFailure } =
  allotTableSlice.actions;

export default allotTableSlice.reducer;
