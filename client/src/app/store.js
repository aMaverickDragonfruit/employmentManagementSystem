import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from '../features/registrationSlice';

const store = configureStore({
  reducer: {
    registrationSlice: registrationReducer,
  },
});

export default store;
