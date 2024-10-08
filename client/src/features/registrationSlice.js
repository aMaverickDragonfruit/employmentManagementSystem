import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getRegistrations,
  createRegistration as createRegistrationApi,
} from '../api/registration';

const initialState = {
  registrations: [],
  loading: false,
  error: null,
};

//Async thunk actions
export const fetchRegistrations = createAsyncThunk(
  'registrations/fetchRegistrations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRegistrations();
      return response;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

export const createRegistration = createAsyncThunk(
  'registrations/createRegistration',
  async (data, { rejectWithValue }) => {
    try {
      const response = await createRegistrationApi(data);
      return response;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

const registrationSlice = createSlice({
  name: 'registrations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegistrations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRegistrations.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.registrations = action.payload;
      })
      .addCase(fetchRegistrations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(createRegistration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRegistration.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default registrationSlice.reducer;
