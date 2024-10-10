import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from '../features/registrationSlice';
import userReducer from '../features/userSlice';
import profileReducer from '../features/profileSlice';

const store = configureStore({
  reducer: {
    registrationSlice: registrationReducer,
    userSlice: userReducer,
    profileSlice: profileReducer,
  },
});

export default store;
