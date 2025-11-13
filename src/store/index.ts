import { configureStore } from '@reduxjs/toolkit';
import {
  // persistReducer,
  persistStore,
  persistCombineReducers,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import languageReducer from './slices/languageTogglerSlice';
import settingsReducer from './slices/settingsSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducers = persistCombineReducers(persistConfig, {
  language: languageReducer,
  settings: settingsReducer,
});

const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
