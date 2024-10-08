import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from '../features/registrationSlice';
import userReducer from '../features/userSlice';

const store = configureStore({
  reducer: {
    registrationSlice: registrationReducer,
    userSlice: userReducer,
  },
});

export default store;
