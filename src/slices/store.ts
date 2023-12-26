import {configureStore} from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import {nutechApi} from './nutech/nutechSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    [nutechApi.reducerPath]: nutechApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(nutechApi.middleware),
});

export default store;
