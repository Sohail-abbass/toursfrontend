// store/store.ts

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/features/userSlice";
import packageReducer from "@/store/features/packageSlice";
import tourReducer from "@/store/features/tourSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    packages: packageReducer,
    tours: tourReducer,
  },
});

// 🔥 Required exports for TypeScript  
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
