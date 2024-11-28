// candidateAuthSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../api/axios';

export const fetchCandidateAuthData = createAsyncThunk(
  'candidateAuth/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/auth/candidate/dashboard');
      return response.data.candidate;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch candidate data');
    }
  }
);

export const loginCandidateAuth = createAsyncThunk(
  'candidateAuth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/candidate/login', { email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const logoutCandidateAuth = createAsyncThunk(
  'candidateAuth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('/auth/candidate/logout');
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

const candidateAuthSlice = createSlice({
  name: 'candidateAuth',
  initialState: {
    candidateAuthData: null,
    isAuthenticatedCandidate: false,
    isLoadingAuth: false,
    authError: null
  },
  reducers: {
    clearAuthError: (state) => {
      state.authError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidateAuthData.pending, (state) => {
        state.isLoadingAuth = true;
      })
      .addCase(fetchCandidateAuthData.fulfilled, (state, action) => {
        state.isLoadingAuth = false;
        state.candidateAuthData = action.payload;
        state.isAuthenticatedCandidate = true;
        state.authError = null;
      })
      .addCase(fetchCandidateAuthData.rejected, (state, action) => {
        state.isLoadingAuth = false;
        state.authError = action.payload;
        state.isAuthenticatedCandidate = false;
      })
      .addCase(loginCandidateAuth.pending, (state) => {
        state.isLoadingAuth = true;
      })
      .addCase(loginCandidateAuth.fulfilled, (state, action) => {
        state.isLoadingAuth = false;
        state.isAuthenticatedCandidate = true;
        state.authError = null;
      })
      .addCase(loginCandidateAuth.rejected, (state, action) => {
        state.isLoadingAuth = false;
        state.authError = action.payload;
        state.isAuthenticatedCandidate = false;
      })
      .addCase(logoutCandidateAuth.pending, (state) => {
        state.isLoadingAuth = true;
      })
      .addCase(logoutCandidateAuth.fulfilled, (state) => {
        state.candidateAuthData = null;
        state.isAuthenticatedCandidate = false;
        state.isLoadingAuth = false;
        state.authError = null;
      })
      .addCase(logoutCandidateAuth.rejected, (state, action) => {
        state.isLoadingAuth = false;
        state.authError = action.payload;
      });
  }
});

export const { clearAuthError } = candidateAuthSlice.actions;
export default candidateAuthSlice.reducer;