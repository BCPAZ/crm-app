import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import api from "@/data/api";
import authSlice from "@/data/slices/authSlice";
import kanbanSlice from "./slices/kanbanSlice";
import projectSlice from "./slices/projectSlice";
import siteSlice from "./slices/siteSlice";
import companySlice from "./slices/companySlice";

const reducers = combineReducers({
  [api.reducerPath]: api.reducer,
  [authSlice.reducerPath]: authSlice.reducer,
  [kanbanSlice.reducerPath]: kanbanSlice.reducer,
  [projectSlice.reducerPath]: projectSlice.reducer,
  [siteSlice.reducerPath]: siteSlice.reducer,
  [companySlice.reducerPath]: companySlice.reducer,
});

const persistedReducer = persistReducer(
  {
    key: "crm.az",
    storage,
    whitelist: [
      authSlice.reducerPath,
      projectSlice.reducerPath,
      kanbanSlice.reducerPath,
    ],
  },
  reducers
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export { persistor, store };
