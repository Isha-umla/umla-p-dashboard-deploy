import { createSlice } from "@reduxjs/toolkit";

const menuItemsSlice = createSlice({
  name: "menuItems",

  initialState: {
    isFetching: false,
    menuItems: [],
  },

  reducers: {
    menuItemsFetchingStart: (initialState) => {
      initialState.isFetching = true;
    },

    menuItemsFetchingSuccess: (initialState, action) => {
      initialState.menuItems = action.payload;
      initialState.isFetching = false;
    },

    addMenuItems: (initialState, action) => {
      // It will add item at index 0 and it changes original array.
      initialState.menuItems.splice(0, 0, action.payload);
      initialState.isFetching = false;
    },

    removeMenuItems: (initialState, action) => {
      initialState.menuItems = initialState.menuItems.filter((item) => {
        return item._id !== action.payload;
      });
    },

    updateMenuItems: (initialState, action) => {
      initialState.menuItems = initialState.menuItems.map((item) => {
        if (item._id === action.payload._id) {
          item = action.payload;
        }
        return item;
      });

      initialState.isFetching = false;
    },
  },
});

export const {
  menuItemsFetchingStart,
  menuItemsFetchingSuccess,
  addMenuItems,
  removeMenuItems,
  updateMenuItems,
} = menuItemsSlice.actions;

export default menuItemsSlice.reducer;
