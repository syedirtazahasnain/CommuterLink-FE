import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import signupReducer from './signupSlice'
import loginReducer from './loginSlice'
import { persistReducer } from 'redux-persist';
import generalReducer from './generalSlice';

const reducers = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  general: generalReducer,
});

const persistConfig = {
  key: 'cl_fe',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true
})
export default store;

 
