import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getProfiles,
  getCurUserProfile,
  getProfileById,
  getProfileByUserId,
  updateCurUserProfile as updateCurUserProfileApi,
  updateProfileById as updateProfileByIdApi,
  updateProfileByUserId as updateProfileByUserIdApi,
} from '../api/profile';

const initialState = {
  profiles: [],
  curProfile: {},
  loading: false,
  error: null,
};

//Async thunk actions
export const fetchProfiles = createAsyncThunk(
  'profiles/fetchProfiles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProfiles();
      return response;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchCurUserProfile = createAsyncThunk(
  'profiles/fetchCurUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCurUserProfile();
      return response;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchProfileById = createAsyncThunk(
  'profiles/fetchProfileById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getProfileById(id);
      return response;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchProfileByUserId = createAsyncThunk(
  'profiles/fetchProfileByUserId',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getProfileByUserId(id);
      return response;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateCurUserProfile = createAsyncThunk(
  'profiles/updateCurUserProfile',
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateCurUserProfileApi(data);
      return response;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

// reqData: {id:profileID, data:newData}
export const updateProfileById = createAsyncThunk(
  'profiles/updateProfileById',
  async (reqData, { rejectWithValue }) => {
    try {
      const response = await updateProfileByIdApi(reqData);
      return response;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

// reqData: {id:userID, data:newData}
export const updateProfileByUserId = createAsyncThunk(
  'profiles/updateProfileByUserId',
  async (reqData, { rejectWithValue }) => {
    try {
      const response = await updateProfileByUserIdApi(reqData);
      return response;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchProfiles
      .addCase(fetchProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.profiles = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // fetchCurUserProfile
      .addCase(fetchCurUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.curProfile = action.payload;
      })
      .addCase(fetchCurUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // fetchProfileById
      .addCase(fetchProfileById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.curProfile = action.payload;
      })
      .addCase(fetchProfileById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // fetchProfileByUserId
      .addCase(fetchProfileByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.curProfile = action.payload;
      })
      .addCase(fetchProfileByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // updateCurUserProfile
      .addCase(updateCurUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCurUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.curProfile = action.payload;
      })
      .addCase(updateCurUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // updateProfileById
      .addCase(updateProfileById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.curProfile = action.payload;
      })
      .addCase(updateProfileById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // updateProfileByUserId
      .addCase(updateProfileByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.curProfile = action.payload;
      })
      .addCase(updateProfileByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default profileSlice.reducer;
