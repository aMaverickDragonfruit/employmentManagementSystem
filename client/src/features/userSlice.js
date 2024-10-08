import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, signup } from '../api/auth';

const initialState = {
  user: [],
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      return await login(credentials);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

export const signupUser = createAsyncThunk(
  'user/signup',
  async (credentials, { rejectWithValue }) => {
    try {
      return await signup(credentials);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    clearUser: (state) => {
      localStorage.removeItem('token');
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token);
        state.loading = false;
        state.error = null;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
