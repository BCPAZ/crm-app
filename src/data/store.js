import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import api from './api';
import authSlice from './slices/authSlice';

const reducers = combineReducers({
  [api.reducerPath]: api.reducer,
  [authSlice.reducerPath]: authSlice.reducer,
});

const persistedReducer = persistReducer(
  {
    key: 'crm.az',
    storage,
    whitelist: [authSlice.reducerPath],
  },
  reducers,
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
