import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import generalReducer, { setCurrentPage } from './generalSlice'
import authReducer from './authSlice'
import { persistReducer } from 'redux-persist';

const reducers = combineReducers({
    general: generalReducer,
    auth: authReducer,
});

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true
})

export const resetCurrentPage = () => {
  store.dispatch(setCurrentPage(''));
  return null;
}
