import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import partnerReducer from "./partnerSlice";
import menuItemsReducer from "./menuItemsSlice";
import allotTableReducer from "./allotTableSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  // blacklist: [],
};

const combinedReducers = combineReducers({
  partner: partnerReducer,
  menuItems: menuItemsReducer,
  allotTable: allotTableReducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
