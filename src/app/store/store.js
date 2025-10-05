import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import tourReducer from './features/tourSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    tour: tourReducer,
  },
});
